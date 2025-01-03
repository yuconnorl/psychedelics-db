import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { streamText } from 'ai'
import { type NextRequest, NextResponse } from 'next/server'

import type { MODEL_MAP } from '@/config/general'

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

  const {
    prompt,
    model = 'gemini-1.5-flash',
  }: { prompt: string; model: keyof typeof MODEL_MAP } = await request.json()

  if (!prompt || typeof prompt !== 'string') {
    return NextResponse.json({ success: false, message: 'No prompt provided' })
  }

  try {
    let result = null

    switch (model) {
      case 'gemini-1.5-flash': {
        const google = createGoogleGenerativeAI({
          apiKey: process.env.GEMINI_API_KEY,
        })

        result = streamText({
          model: google('gemini-1.5-flash'),
          system: `You are an expert in summarizing structured data from research papers. You will be provided with structured text data from research papers related to the user's query. Your task is to:

          1. Use the information from the provided research papers to explain the user's query
          2. When citing papers, you MUST:
             - Use individual citations for each reference, not grouped citations
             - Format each citation as a Markdown link: [1](paper_url) 
             - Include citations immediately after the relevant statement
             - Never use comma-separated citations like [1, 2, 3]
             - Each paper should maintain its original URL as provided in the paper details
          
          Example of CORRECT citation formatting:
          "Psychedelic-assisted therapy shows promise as a novel treatment for PTSD [1](https://paper1-url) and has demonstrated significant efficacy in clinical trials [2](https://paper2-url)."
          
          Example of INCORRECT citation formatting:
          "Psychedelic-assisted therapy shows promise as a novel treatment for PTSD and depression [1, 2, 3]."
          
          Always ensure each citation is individually linked to maintain proper source attribution and accessibility.`,
          prompt: `${prompt}`,
        })
        break
      }

      // case 'gpt-4o-mini': {
      //   result = streamText({
      //     model: openai('gpt-4o-mini'),
      //     system: `You are an expert in summarizing structured data from research papers. You will be provided with structured text data from five research papers related to the query of user . Your task is to use the information from five research papers to explain the query of user. Also, when refering to particular paper, add link to it with the URL field in paper detail, the format must follow: [paper order](link), e.g. [paper 1](link). Ensure that the summary is clear, concise, and informative.`,
      //     prompt: `${prompt}`,
      //   })
      //   break
      // }

      default:
        throw new Error('Error performing embedding, unsupported model')
    }

    return result.toDataStreamResponse()
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error('Error performing embedding', error)
    return NextResponse.json({ success: false, message: 'Error fetching PDF' })
  }
}
