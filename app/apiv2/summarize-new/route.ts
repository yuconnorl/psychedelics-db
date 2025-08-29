import { google } from '@ai-sdk/google'
import { convertToModelMessages, smoothStream, streamText } from 'ai'
import { type NextRequest, NextResponse } from 'next/server'

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

  const { prompt }: { prompt: string } = await request.json()

  if (!prompt || typeof prompt !== 'string') {
    return NextResponse.json({ success: false, message: 'No prompt provided' })
  }

  try {
    const system = `You are an expert in summarizing structured data from research papers. You will be provided with structured text data from research papers related to the user's query. Your task is to:

      1. Use the information from the provided research papers to explain the user's query
      2. When citing papers, you MUST:
         - Use individual citations for each reference, not grouped citations
         - Format each citation as a Markdown link: [1](paper_url_1), [2](paper_url_2), etc.
         - Include citations immediately after the relevant statement
         - Never use comma-separated citations like [1, 2, 3]
         - Each paper citation should maintain its original URL as provided in the paper details

      Example of CORRECT citation:
      "Psychedelic-assisted therapy shows promise as a novel treatment for PTSD [1](paper_url_1) and has demonstrated significant efficacy in clinical trials [2](paper_url_2)."

      Example of INCORRECT citation:
      "Psychedelic-assisted therapy shows promise as a novel treatment for PTSD and depression [1, 2]."

      3. Reply with Traditional Chinese (TW), and make sure you use the correct terms when referring to:
         - "Psychedelics" → "啟靈藥"
         - "Psilocybin" → "裸蓋菇鹼"
         - "Ibogaine" → "伊波加因"
         - "Ketamine" → "K他命"
         - "Empathy" → "同理心"
         - "Schizophrenia" → "思覺失調症"
      4. For each special term, provide both Traditional Chinese (TW) and the English term in brackets, e.g., "裸蓋菇鹼 (Psilocybin)".

      Always ensure each citation is individually linked to maintain proper source attribution and accessibility.`

    const result = streamText({
      model: google('gemini-2.5-flash'),
      system,
      prompt: prompt,
      experimental_transform: smoothStream({
        delayInMs: 10,
        chunking: 'word',
      }),
    })

    return result.toUIMessageStreamResponse()
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error('Error performing summarize', error)
    return NextResponse.json({
      success: false,
      message: 'Error performing summarize',
    })
  }
}
