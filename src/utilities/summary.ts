import { type VectorSearchPoints } from '@/types/dataTypes'

export const vectorResultFormatter = (
  results: VectorSearchPoints[],
): string => {
  if (!results || results.length === 0) {
    return 'No relevant papers found.'
  }

  return results
    .map((result, index) => {
      const { payload: { title, abstract, summary, slug } = {}, score } = result
      const abstractText = abstract?.[0]?.children?.[0]?.text || 'N/A'
      const baseUrl =
        process.env.NODE_ENV === 'production'
          ? process.env.NEXT_PUBLIC_APP_URL
          : 'http://localhost:3000'

      return `
PAPER ${index + 1} [Similarity: ${(score || 0).toFixed(3)}]
========================
TITLE: ${title || 'N/A'}
URL: ${baseUrl}/research/${slug}

ABSTRACT:
${abstractText}

KEY FINDINGS:
${
  summary?.map((s, i) => `${i + 1}. ${s.summary}`).join('\n') ||
  'No summaries available'
}
------------------------`
    })
    .join('\n')
}

export const fetchVectorResultSummary = async (
  message: string,
  onChunk: (chunk: string) => void,
) => {
  const response = await fetch('/apiv2/summarize', {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.body) {
    throw new Error('No response body')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()

    if (done) break

    const chunk = decoder.decode(value)
    onChunk(chunk)
  }
}
