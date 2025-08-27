import { GoogleGenAI } from '@google/genai'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { type NextRequest, NextResponse } from 'next/server'

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

  const {
    message,
    model = 'gemini-1.5-flash',
  }: { message: string; model: keyof typeof MODEL_MAP } = await request.json()

  if (!message) {
    return NextResponse.json({ success: false, message: 'No message provided' })
  }

  try {
    const embeddingData: number[] = []

    switch (model) {
      case 'gemini-1.5-flash': {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        const gemini = genAI.getGenerativeModel({ model: 'text-embedding-004' })
        const geminiResult = await gemini.embedContent(message)

        // embeddingData = response.embedding.values || []
        break
      }

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
