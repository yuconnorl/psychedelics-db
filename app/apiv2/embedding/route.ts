import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'
import { type NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

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

  const { message } = await request.json()

  if (!message) {
    return NextResponse.json({ success: false, message: 'No message provided' })
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const embedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: message,
      encoding_format: 'float',
      dimensions: 768,
    })

    // const model = genAI.getGenerativeModel({
    //   model: 'gemini-1.5-flash',
    //   generationConfig: {
    //     responseMimeType: 'application/json',
    //     responseSchema: schema,
    //   },
    // })

    const embeddingData = embedding?.data[0]?.embedding || []

    return NextResponse.json({ embedding: embeddingData, success: true })
  } catch (error: unknown) {
    console.error('Error performing embedding', error)
    return NextResponse.json({ success: false, message: 'Error fetching PDF' })
  }
}
