'use client'

import { useEffect } from 'react'
import { useCompletion } from 'ai/react'

import MarkdownParser from '@/components/MarkdownParser'
import { vectorResultFormatter } from '@/utilities/summary'

type CompletionResultProps = {
  search: string
  searchResults: any[]
}

const CompletionResult = ({ search, searchResults }: CompletionResultProps) => {
  const {
    completion,
    complete,
    isLoading: isCompletionLoading,
  } = useCompletion({
    api: '/apiv2/summarize',
  })

  useEffect(() => {
    if (!search || searchResults.length === 0) return

    const message = `User's query: "${search}"\n\nResearch papers data:\n${vectorResultFormatter(
      searchResults,
    )}`

    complete(message)
  }, [search, searchResults, complete])

  return (
    <div className='relative prose max-h-[50dvh] overflow-y-scroll py-3 px-6 border-primary/10 rounded-2xl'>
      {isCompletionLoading && <div>🧠 Analysing...</div>}
      <MarkdownParser content={completion} />
    </div>
  )
}

export default CompletionResult
