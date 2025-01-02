import { GoogleGenerativeAI } from '@google/generative-ai'
import { type NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

import type { MODEL_MAP } from '@/config/general'

/** Turn string into embedding data */
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

  // const { message }: { message: string } = await request.json()
  const {
    message,
    model = 'gemini-1.5-flash',
  }: { message: string; model: keyof typeof MODEL_MAP } = await request.json()

  if (!message) {
    return NextResponse.json({ success: false, message: 'No message provided' })
  }

  try {
    let embeddingData: number[] = []

    // const model = 'gemini-1.5-flash'

    switch (model) {
      case 'gemini-1.5-flash': {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        const gemini = genAI.getGenerativeModel({ model: 'text-embedding-004' })
        const geminiResult = await gemini.embedContent(message)
        embeddingData = geminiResult.embedding.values || []
        break
      }

      // case 'gpt-4o-mini': {
      //   const openai = new OpenAI({
      //     apiKey: process.env.OPENAI_API_KEY,
      //   })
      //   const openaiResult = await openai.embeddings.create({
      //     model: 'text-embedding-3-small',
      //     input: message,
      //     encoding_format: 'float',
      //     dimensions: 768,
      //   })
      //   embeddingData = openaiResult?.data[0]?.embedding || []
      //   break
      // }

      default:
        throw new Error('Error performing embedding, unsupported model')
    }

    return NextResponse.json({ embedding: embeddingData, success: true })
  } catch (error: unknown) {
    console.error('Error performing embedding', error)
    return NextResponse.json({
      success: false,
      message: 'Generate embedding error',
    })
  }
}
