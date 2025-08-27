import { google } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

/** Summarizes and extracts structured data from a PDF research paper. */
export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin')

  if (process.env.NODE_ENV === 'production' && origin !== process.env.APP_URL) {
    return NextResponse.json(
      {
        success: false,
        message: 'CORS policy: No access allowed from this origin',
      },
      { status: 403 },
    )
  }

  const pdfData = await request.arrayBuffer()

  try {
    // const model = google('gemini-1.5-flash', { structuredOutputs: true })
    const model = google('gemini-2.5-flash')

    // const prompt = `You are an expert at structured data extraction. You will be given pdf file from a research paper and should convert and summarize it into the given structure.
    // Parse the pdf data into following format. Generate 3 to 7 key findings from the data provided, make sure to cover all key findings in the research. Also convert the keyfindings you compiled into traditional chinese, make sure to add extra space between English words and Chinese words. Keep the original title, abstract and keywords as it is. If there's no keywords provided, generate it. The return data should be in the following format:

    //   {
    //     keyFindings: ['key finding 1', 'key finding 2'],
    //     keyFindingsZhTw: ['key finding 1', 'key finding 2'],
    //     publishedAt: 'yyyy-mm-dd',
    //     title: '',
    //     abstract: '',
    //     keywords: ['keyword 1', 'keyword 2'],
    //     authors: ['author 1', 'author 2'],
    //     journal: '',
    //     doi: ''
    //   }
    // `

    const prompt = `You are an expert in structured data extraction. You will receive a PDF from a research paper and must convert and summarize it into the specified structure. For each text field, ensure proper spacing between Chinese and English/numeric content by:
1. Adding a space between Chinese characters and English letters/numbers
2. Adding a space between Chinese characters and hyphenated terms
3. Maintaining existing correct spacing
4. Do not add period at the end of Chinese sentences

Identify 3 to 7 key findings, ensuring every crucial point is captured. Then translate those key findings into Traditional Chinese with proper spacing. Keep the original title, abstract, and keywords; generate keywords if none exist. The final output should follow this format:

{
  keyFindings: ['key finding 1', 'key finding 2'],
  keyFindingsZhTw: ['properly spaced finding 1', 'properly spaced finding 2'],
  publishedAt: 'yyyy-mm-dd',
  title: '',
  abstract: '',
  keywords: ['keyword 1', 'keyword 2'],
  authors: ['author 1', 'author 2'],
  journal: '',
  doi: ''
}

Example of proper spacing:
Incorrect: "在被診斷患有精神疾病的使用者中，大多數人在使用5-MeO-DMT後回報症狀有所改善"
Correct: "在被診斷患有精神疾病的使用者中，大多數人在使用 5-MeO-DMT 後回報症狀有所改善"`

    const structuredPdfData = await generateObject({
      model: model,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'file',
              mediaType: 'application/pdf',
              data: new Uint8Array(pdfData),
            },
          ],
        },
      ],
      schema: z.object({
        title: z.string(),
        authors: z.array(z.string()),
        abstract: z.string(),
        keywords: z.array(z.string()),
        keyFindings: z.array(z.string()),
        keyFindingsZhTw: z.array(z.string()),
        journal: z.string(),
        doi: z.string(),
        publishedAt: z.string(),
      }),
    })

    const researchPaperDetail = structuredPdfData?.object

    return NextResponse.json({
      success: true,
      researchPaperDetail: researchPaperDetail,
    })
  } catch (error: unknown) {
    console.error('Error performing embedding', error)
    return NextResponse.json({
      success: false,
      message: 'Error fetching with PDF data',
    })
  }
}
