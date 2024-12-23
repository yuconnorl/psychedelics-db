/* eslint-disable no-console */

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

// Deprecated because exceeding the chatGPT rate limit
export const summarizePaperWithUrl = async (url) => {
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

interface EmbeddingResponse {
  // Define the expected properties of the response here
  embedding: number[]
  // Add other properties as needed
}

export const getEmbedding = async (message) => {
  try {
    const response = await fetch('/apiv2/embedding', {
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

export const queryVector = async (message: number[]) => {
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
