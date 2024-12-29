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
    const model = google('gemini-1.5-flash', {
      structuredOutputs: true,
    })

    const prompt = `You are an expert at structured data extraction. You will be given pdf file from a research paper and should convert and summarize it into the given structure.
    Parse the pdf data into following format. Generate 3 to 7 key findings from the data provided, make sure to cover all key findings in the research. Keep the original title, abstract and keywords as it is. If there's no keywords provided, generate it. The return data should be in the following format:

      {
        keyFindings: ['key finding 1', 'key finding 2'],
        title: '',
        abstract: '',
        keywords: ['keyword 1', 'keyword 2'],
        authors: ['author 1', 'author 2'],
        journal: '',
        doi: ''
      }
    `

    const structuredPdfData = await generateObject({
      model: model,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'file',
              mimeType: 'application/pdf',
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
        journal: z.string(),
        doi: z.string(),
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
