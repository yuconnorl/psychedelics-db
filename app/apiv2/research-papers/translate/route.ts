import { google } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

/** Summarizes and extracts structured data from a PDF research paper. */
export async function POST(request: NextRequest) {
  // const origin = request.headers.get('origin')

  // if (process.env.NODE_ENV === 'production' && origin !== process.env.APP_URL) {
  //   return NextResponse.json(
  //     {
  //       success: false,
  //       message: 'CORS policy: No access allowed from this origin',
  //     },
  //     { status: 403 },
  //   )
  // }

  const { summaries: summaryData } = await request.json()

  try {
    const model = google('gemini-2.5-flash')

    const prompt = `You are an expert in sentence translation. You will receive a string data from research paper summary in English, which contain 5 to 10 summary sentences, and must translate it into Traditional Chinese. For each text field, ensure proper spacing between Chinese and English/numeric content by:
1. Adding a space between Chinese characters and English letters/numbers
2. Adding a space between Chinese characters and hyphenated terms
3. Maintaining existing correct spacing
4. Do not add period at the end of Chinese sentences

The final output should follow this format:

{
  keyFindingsZhTw: ['properly spaced finding 1', 'properly spaced finding 2'],
}

Example of proper spacing:
Incorrect: "在被診斷患有精神疾病的使用者中，大多數人在使用5-MeO-DMT後回報症狀有所改善"
Correct: "在被診斷患有精神疾病的使用者中，大多數人在使用 5-MeO-DMT 後回報症狀有所改善"
  
data: ${summaryData}
`

    const structuredPdfData = await generateObject({
      model: model,
      messages: [
        {
          role: 'user',
          content: [{ type: 'text', text: prompt }],
        },
      ],
      schema: z.object({
        keyFindingsZhTw: z.array(z.string()),
      }),
    })

    const keyFindingsZhTw = structuredPdfData?.object

    return NextResponse.json({
      success: true,
      keyFindingsZhTw: keyFindingsZhTw,
    })
  } catch (error: unknown) {
    console.error('Error performing embedding', error)
    return NextResponse.json({
      success: false,
      message: 'Error fetching with PDF data',
    })
  }
}
