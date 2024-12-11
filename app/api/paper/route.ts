import * as cheerio from 'cheerio'
import { type NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'

const ResearchPaperExtraction = z.object({
  title: z.string(),
  authors: z.array(z.string()),
  abstract: z.string(),
  keywords: z.array(z.string()),
  keyFindings: z.array(z.string()),
  journal: z.string(),
})

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams
  const doi = searchParams.get('doi')
  const url = searchParams.get('url')

  if (!doi && !url) {
    return NextResponse.json({
      success: false,
      message: 'DOI or URL not provided',
    })
  }

  let jinaFetchUrl = ''

  if (doi) {
    const scihubUrl = 'https://sci-hub.se'
    const fetchUrl = `${scihubUrl}/${doi}`

    console.log('fetchUrl', fetchUrl)

    const response = await fetch(fetchUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Extract the src attribute value from the embed tag
    const src = $('#article embed#pdf').attr('src')

    if (!src) {
      return NextResponse.json({ success: false, message: 'PDF src not found' })
    }

    jinaFetchUrl = src.startsWith('//') ? `https:${src}` : src
  } else {
    jinaFetchUrl = url
  }

  const jinaUrl = `https://r.jina.ai/${jinaFetchUrl}`

  try {
    const jinaResponse = await fetch(jinaUrl)

    if (!jinaResponse.ok) {
      throw new Error(`Jina Error: ${jinaResponse.status}`)
    }

    const jinaText = await jinaResponse.text()

    const promptText = `Parse the string data into following format. Generate 3 to 5 key findings from the data provided. Keep the original title, abstract and keywords as it is. If there's no keywords provided, generate it. The return data should be in the following format:

      {
        keyFindings: ['key finding 1', 'key finding 2'],
        title: '',
        abstract: '',
        keywords: ['keyword 1', 'keyword 2'],
        authors: ['author 1', 'author 2'],
        journal: ''
      }

      Research Paper Data: ${jinaText}`

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const completion = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert at structured data extraction. You will be given unstructured text from a research paper and should convert and summarize it into the given structure.',
        },
        { role: 'user', content: promptText },
      ],
      response_format: zodResponseFormat(
        ResearchPaperExtraction,
        'research_paper_extraction',
      ),
      stream: false,
    })

    const researchPaperDetail = completion?.choices[0].message.parsed

    return NextResponse.json({
      success: true,
      src: jinaFetchUrl,
      researchPaperDetail,
    })
  } catch (error: unknown) {
    console.error('Error fetching PDF:', error)
    return NextResponse.json({ success: false, message: 'Error fetching PDF' })
  }
}
