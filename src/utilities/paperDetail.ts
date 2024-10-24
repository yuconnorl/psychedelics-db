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
