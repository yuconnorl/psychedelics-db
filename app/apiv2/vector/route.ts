/* eslint-disable no-console */
import { QdrantClient } from '@qdrant/js-client-rest'
import { type NextRequest, NextResponse } from 'next/server'

// update vector database
export async function PUT(request: NextRequest) {
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

  if (!message || message.length === 0) {
    return NextResponse.json({ success: false, message: 'No message provided' })
  }

  try {
    const qdrantClient = new QdrantClient({
      url: process.env.QDRANT_URL,
      apiKey: process.env.QDRANT_API_KEY,
      port: 6333,
    })

    const operationInfo = await qdrantClient.upsert('papers', {
      points: message,
    })

    return NextResponse.json({ operationInfo: operationInfo, success: true })
  } catch (error: unknown) {
    console.error('Error Updating Vector: ', error)
    return NextResponse.json({
      success: false,
      message: 'Error Updating Vector',
    })
  }
}

// query vector database
export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin')

  if (origin !== process.env.APP_URL) {
    return NextResponse.json(
      {
        success: false,
        message: 'CORS policy: No access allowed from this origin',
      },
      { status: 403 },
    )
  }

  const { message }: { message: number[] | [] } = await request.json()

  if (!message || message.length === 0) {
    return NextResponse.json({ success: false, message: 'No message provided' })
  }

  try {
    const qdrantClient = new QdrantClient({
      url: process.env.QDRANT_URL,
      apiKey: process.env.QDRANT_API_KEY,
      port: 6333,
    })

    const queryResults = await qdrantClient.query('papers', {
      query: message,
      limit: 5,
      with_payload: true,
    })

    return NextResponse.json({ queryResults: queryResults, success: true })
  } catch (error: unknown) {
    console.error('Error Updating Vector: ', error)
    return NextResponse.json({
      success: false,
      message: 'Error Updating Vector',
    })
  }
}
