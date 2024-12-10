import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
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

  // if (!prompt) {
  //   return NextResponse.json({ success: false, message: 'No prompt provided' })
  // }

  try {
    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: `You are an expert in summarizing structured data from research papers. You will be provided with structured text data from five research papers related to the user's query. Your task is to summarize the key findings from these research papers, highlighting their relevance and similarity to the user's query. Also, when refering to particular paper, add link to it with the URL field in paper detail. Ensure that the summary is clear, concise, and informative.`,
      prompt: `${prompt}`,
    })

    return result.toDataStreamResponse()
  } catch (error: unknown) {
    console.error('Error performing embedding', error)
    return NextResponse.json({ success: false, message: 'Error fetching PDF' })
  }
}
