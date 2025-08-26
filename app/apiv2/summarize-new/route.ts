import { google } from '@ai-sdk/google'
import { convertToModelMessages, streamText, UIMessage } from 'ai'
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
    const message = `You are an expert in summarizing structured data from research papers. You will be provided with structured text data from research papers related to the user's query. Your task is to:

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
      
      Always ensure each citation is individually linked to maintain proper source attribution and accessibility.
      Finally, reply with traditional Chinese (TW)
      user input: ${prompt}
      `

    // const messages = {
    //   role: 'Gemini: ',
    //   parts: [message],
    // }

    console.log('messages', message)

    const result = streamText({
      model: google('gemini-2.5-flash'),
      messages: convertToModelMessages(message),
    })

    console.log('result', result)

    return result.toUIMessageStreamResponse()

    return result.toDataStreamResponse()
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error('Error performing summarize', error)
    return NextResponse.json({
      success: false,
      message: 'Error performing summarize',
    })
  }
}
