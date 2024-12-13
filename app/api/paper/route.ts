import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'
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
    const geminiPrompt = `You are an expert at structured data extraction. You will be given unstructured text from a research paper and should convert and summarize it into the given structure,
    
    Parse the string data into following format. Generate 3 to 5 key findings from the data provided. Keep the original title, abstract and keywords as it is. If there's no keywords provided, generate it. The return data should be in the following format:

      {
        keyFindings: ['key finding 1', 'key finding 2'],
        title: '',
        abstract: '',
        keywords: ['keyword 1', 'keyword 2'],
        authors: ['author 1', 'author 2'],
        journal: ''
      }

      Research Paper Data: ${jinaText}
      `
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

    // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

    const schema = {
      description: 'Detail of research paper',
      type: SchemaType.OBJECT,
      properties: {
        keyFindings: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.STRING,
          },
        },
        title: {
          type: SchemaType.STRING,
        },
        abstract: {
          type: SchemaType.STRING,
        },
        keywords: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.STRING,
          },
        },
        authors: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.STRING,
          },
        },
        journal: {
          type: SchemaType.STRING,
        },
      },
      required: [
        'keyFindings',
        'title',
        'abstract',
        'keywords',
        'authors',
        'journal',
      ],
    }

    // const model = genAI.getGenerativeModel({
    //   model: 'gemini-1.5-pro',
    //   generationConfig: {
    //     responseMimeType: 'application/json',
    //     responseSchema: schema,
    //   },
    // })

    // const result = await model.generateContent(geminiPrompt)
    // const resultJson = JSON.parse(result.response.text())

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
      researchPaperDetail: researchPaperDetail,
    })
  } catch (error: unknown) {
    console.error('Error fetching PDF:', error)
    return NextResponse.json({ success: false, message: 'Error fetching PDF' })
  }
}

const test = {
  abstract:
    'Recent studies have sparked renewed interest in the therapeutic potential of psychedelics for treating depression and other mental health conditions. Simultaneously, the novel psychoactive substances (NPS) phenomenon, with a huge number of NPS emerging constantly, has changed remarkably the illicit drug market, being their scientific evaluation an urgent need. Thus, this study aims to elucidate the impact of amino-terminal modifications to the 5-MeO-DMT molecule on its interactions with serotonin receptors and transporters, as well as its psychoactive and thermoregulatory properties.',
  authors: [
    'Pol Puigseslloses',
    'Núria Nadal-Gratacós',
    'Gabriel Ketsela',
    'Nicola Weiss',
    'Xavier Berzosa',
    'Roger Estrada-Tejedor',
    'Mohammad Nazmul Islam',
    'Marion Holy',
    'Marco Niello',
    'David Pubill',
    'Jordi Camarasa',
    'Elena Escubedo',
    'Harald H. Sitte',
    'Raúl López-Arnau',
  ],
  journal: 'Molecular Psychiatry',
  keyFindings: [
    'All examined 5-MeO-tryptamines exhibited selectivity for 5-HT1AR over 5-HT2AR.',
    '5-MeO-pyr-T was identified as the most potent partial 5-HT releaser among the tested compounds.',
    'All tested tryptamines elicited the head twitch response (HTR) in mice, indicative of a potential hallucinogenic effect, primarily mediated by 5-HT2AR activation. However, 5-HT1AR activation was found to attenuate the HTR.',
    'Tryptamines that produced a higher hypothermic response, mediated by 5-HT1AR, tended to exhibit a lower hallucinogenic effect.',
    'Some 5-MeO-tryptamines elicited very low HTR but still acted as potent 5-HT2AR agonists, suggesting their potential as non-hallucinogenic therapeutic agents.',
  ],
  keywords: [
    '5-MeO-DMT',
    'psychedelics',
    'serotonin receptors',
    'hallucinogenic effects',
    'thermoregulation',
    'head twitch response',
    '5-HT1AR',
    '5-HT2AR',
    'SERT',
    'drug development',
  ],
  title:
    'Structure-activity relationships of serotonergic 5-MeO-DMT derivatives: insights into psychoactive and thermoregulatory properties',
}
