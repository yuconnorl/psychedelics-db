import { type NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from "@google/genai";

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
  }: { message: string; model: keyof typeof MODEL_MAP } = await request.json()

  if (!message) {
    return NextResponse.json({ success: false, message: 'No message provided' })
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const result = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: message,
      config: {
        outputDimensionality: 1536,
      }
    });

    return NextResponse.json({ embedding: result.embeddings[0].values, success: true })
  } catch (error: unknown) {
    console.error('Error performing embedding', error)
    return NextResponse.json({
      success: false,
      message: 'Generate embedding error',
    })
  }
}
