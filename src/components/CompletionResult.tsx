'use client'

import { useEffect, useState } from 'react'
import { useCompletion } from 'ai/react'

import MarkdownParser from '@/components/MarkdownParser'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { type VectorSearchPoints } from '@/types/dataTypes'
import { localStorageHelper } from '@/utilities/localStorage'
import { vectorResultFormatter } from '@/utilities/summary'

const CompletionLoadingSkeleton = () => {
  return (
    <>
      <div className='relative my-2'>
        <span className='animate-spin'>🧠 </span>
        Analysing...
      </div>
      <div className='flex flex-col gap-6'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[60%]' />
          <Skeleton className='h-4 w-[84%]' />
          <Skeleton className='h-4 w-[73%]' />
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[32%]' />
          <Skeleton className='h-4 w-[65%]' />
          <Skeleton className='h-4 w-[48%]' />
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[74%]' />
          <Skeleton className='h-4 w-[36%]' />
          <Skeleton className='h-4 w-[50%]' />
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[38%]' />
          <Skeleton className='h-4 w-[60%]' />
          <Skeleton className='h-4 w-[52%]' />
        </div>
      </div>
    </>
  )
}

type CompletionResultProps = {
  search: string
  searchResults: VectorSearchPoints[]
  wholeLoading: boolean
  setWholeLoading: (value: boolean) => void
  model: string
}

const CompletionResult = ({
  search,
  searchResults,
  wholeLoading,
  setWholeLoading,
  model,
}: CompletionResultProps) => {
  const [completionCacheData, setCompletionCacheData] = useState('')

  const {
    completion,
    complete,
    isLoading: isCompletionLoading,
  } = useCompletion({
    api: '/apiv2/summarize',
    body: {
      model: model,
    },
  })

  useEffect(() => {
    const completionCache = localStorageHelper.get('completion-cache') as string
    setCompletionCacheData(completionCache)
  }, [])

  useEffect(() => {
    if (!search || searchResults.length === 0) return
    const completionCache = localStorageHelper.get('completion-cache') as string
    if (completionCache) return

    const message = `User's query: "${search}"\n\nResearch papers data:\n${vectorResultFormatter(
      searchResults,
    )}`

    complete(message)
  }, [search, searchResults, complete, completionCacheData])

  useEffect(() => {
    if (!completion || isCompletionLoading) return

    localStorageHelper.set('completion-cache', completion)
    setWholeLoading(false)
  }, [completion, isCompletionLoading, setWholeLoading])

  return (
    <div
      className={cn(
        'prose relative flex-[1_1_0] overflow-y-scroll rounded-xl border-primary/10 bg-muted-foreground/5 px-4 pb-4 pt-4 dark:prose-invert prose-p:my-2 prose-strong:text-primary md:max-h-[50dvh] md:px-5 md:prose-p:my-4',
        isCompletionLoading && 'animate-pulse overflow-y-hidden',
      )}
    >
      <Badge className='bg-muted py-1.5 text-primary/80 hover:bg-muted'>
        <span className='ml-1'>Summarize</span>
      </Badge>
      {wholeLoading && !isCompletionLoading && <CompletionLoadingSkeleton />}
      {
        <MarkdownParser
          content={
            !completion && !wholeLoading && !isCompletionLoading
              ? completionCacheData
              : completion
          }
        />
      }
    </div>
  )
}

export default CompletionResult
