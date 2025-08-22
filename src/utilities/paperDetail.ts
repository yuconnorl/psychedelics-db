/* eslint-disable no-console */
import { type VectorSearchPoints } from '@/types/dataTypes'
import type { Models } from '@/types/general'

export const summarizePaperWithDoi = async (doi) => {
  if (!doi || doi === '') {
    throw new Error('DOI is empty')
  }

  try {
    const paperData = await fetch(`/api/paper?doi=${doi}`)
    return paperData
  } catch (error: unknown) {
    console.log('Error fetching paper:', error)
  }
}

export const summarizePaperWithUrl = async (url: string) => {
  if (!url || url === '') {
    throw new Error('URL is empty')
  }

  try {
    const paperData = await fetch(`/api/paper?url=${url}`)
    return paperData
  } catch (error: unknown) {
    console.log('Error fetching paper:', error)
  }
}

export const summarizePaperWithPdfFile = async (pdfData: FormData) => {
  try {
    const paperData = await fetch(`/apiv2/research-papers/extract`, {
      method: 'POST',
      body: pdfData,
    })
    return paperData
  } catch (error: unknown) {
    console.log('Error fetching paper:', error)
  }
}

export const translateSummaries = async (summaries: string[]) => {
  try {
    const paperData = await fetch(`/apiv2/research-papers/translate`, {
      method: 'POST',
      body: JSON.stringify({ summaries }),
    })
    return paperData
  } catch (error: unknown) {
    console.log('Error fetching paper:', error)
  }
}

interface EmbeddingResponse {
  embedding: number[]
}

export const getEmbedding = async (
  message: string,
  model: Models | null = 'gemini-1.5-flash',
) => {
  try {
    const response = await fetch('/apiv2/embedding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, model }),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data: EmbeddingResponse = await response.json()
    return data
  } catch (error: unknown) {
    console.log('Error fetching paper:', error)
    return undefined
  }
}

export const getEmbeddingNew = async (
  message: string,
) => {
  try {
    const response = await fetch('/apiv2/embedding-new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data: EmbeddingResponse = await response.json()
    return data
  } catch (error: unknown) {
    console.log('Error fetching paper:', error)
    return undefined
  }
}

interface UpdateVectorResponse {
  time: number
  success: boolean
  result: {
    status: 'acknowledged' | 'completed'
    operation_id: number
  }
  message?: string
}

export const updateVector = async (message) => {
  try {
    const response = await fetch('/apiv2/vector', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data: UpdateVectorResponse = await response.json()
    return data
  } catch (error: unknown) {
    console.log('Error fetching paper:', error)
  }
}

interface VectorQueryResponse {
  queryResults: {
    points: VectorSearchPoints[]
  }
  success: boolean
}

export const queryVector = async (
  message: number[],
): Promise<VectorQueryResponse> => {
  try {
    const response = await fetch('/apiv2/vector', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error: unknown) {
    console.log('Error fetching paper:', error)
  }
}
