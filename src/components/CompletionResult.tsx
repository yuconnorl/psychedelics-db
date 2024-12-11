'use client'

import { useEffect, useState } from 'react'
import { useCompletion } from 'ai/react'

import { ChatGPTIcon } from '@/components/Icons'
import MarkdownParser from '@/components/MarkdownParser'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { localStorageHelper } from '@/utilities/localStorage'
import { vectorResultFormatter } from '@/utilities/summary'

const CompletionLoadingSkeleton = () => {
  return (
    <>
      <div className='relative mb-2'>
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
  searchResults: any[]
  wholeLoading: boolean
  setWholeLoading: (value: boolean) => void
}

const CompletionResult = ({
  search,
  searchResults,
  wholeLoading,
  setWholeLoading,
}: CompletionResultProps) => {
  const [completionCacheData, setCompletionCacheData] = useState('')

  const {
    completion,
    complete,
    isLoading: isCompletionLoading,
  } = useCompletion({
    api: '/apiv2/summarize',
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
        'relative prose dark:prose-invert bg-muted-foreground/5 prose-strong:text-primary max-h-[50dvh] pt-4 pb-4 px-5 border-primary/10 rounded-xl overflow-y-scroll',
        isCompletionLoading && 'overflow-y-hidden animate-pulse',
      )}
    >
      <Badge className='bg-muted text-primary/80 hover:bg-muted py-1.5'>
        <ChatGPTIcon />
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
