'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'

import { getEmbedding, queryVector } from '../utilities/paperDetail'
import VectorSearchResult from './VectorSearchResult'

import Streaming from '@/components/CompletionResult'
import { CubeTransparentIcon, InfoIcon, UpArrowIcon } from '@/components/Icons'
import ProseMirrorEditor from '@/components/ProseMirrorEditor'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const searchFetcher = async (searchTerm: string) => {
  if (!searchTerm) return []

  const { embedding } = await getEmbedding(searchTerm)
  const { queryResults } = await queryVector(embedding)

  return queryResults?.points || []
}

const VectorSearch = () => {
  const searchRef = useRef('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [open, setOpen] = useState(false)

  const {
    data: results = [],
    error,
    isLoading,
  } = useSWR(
    debouncedSearch ? ['vectorSearch', debouncedSearch] : null,
    ([_, term]) => searchFetcher(term),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
      dedupingInterval: 5000,
      onError: (err) => {
        // eslint-disable-next-line no-console
        console.log('SWR fetch error message: ', err)
        toast.warning('Something went wrong 😢. Please try again')
      },
    },
  )

  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    // if (!event?.currentTarget?.textContent) return
    // searchRef.current = event.currentTarget.textContent

    console.log('ee', event)
  }

  const handleSearchButtonClick = useCallback(() => {
    if (!searchRef.current) {
      toast.warning('Please input keywords to search')
      return
    }
    setDebouncedSearch(searchRef.current)
  }, [searchRef])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSearchButtonClick()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleSearchButtonClick])

  return (
    <>
      <Button className='mb-3' onClick={() => setOpen(true)}>
        <CubeTransparentIcon className='mr-2 animate-spin animate-infinite animate-duration-[3000ms] animate-ease-in-out' />
        Vector Search
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-[90%] md:max-w-4xl xl:max-w-5xl px-5 py-[1.35rem] md:p-6'>
          <DialogHeader className='flex flex-col items-center'>
            <DialogTitle className='flex justify-center items-center my-5 text-2xl md:text-3xl'>
              <CubeTransparentIcon
                className={cn(
                  'mr-1.5 md:mr-2 w-5 h-5 md:w-6 md:h-6',
                  isLoading &&
                    'animate-spin animate-infinite animate-duration-[1500ms] animate-ease-in-out',
                )}
              />
              Expand your consciousness
            </DialogTitle>
            {/* <DialogDescription className='max-w-full md:max-w-[40%] px-1 mt-3 md:mt-4'>
              Vector search is an algorithm that transforms data into vectors,
              allowing efficient retrieval of similar items in large datasets by
              comparing their positions in high-dimensional space.
            </DialogDescription> */}
          </DialogHeader>
          {/* Search input box */}
          <div className='flex flex-col items-center mt-3 gap-2 mb-4 md:mb-6'>
            <div className='flex flex-col w-full mx-auto max-w-2xl bg-secondary text-primary pl-4 pt-2.5 pr-2.5 pb-2.5 sm:mx-0 rounded-2xl'>
              <div className='flex w-full justify-between'>
                <div className='mt-1 max-h-96 w-full overflow-y-auto break-words min-h-[4.5rem] mb-2 mr-3'>
                  <ProseMirrorEditor />
                </div>
                <Button
                  onClick={handleSearchButtonClick}
                  className='flex disabled:cursor-not-allowed text-secondary bg-primary'
                  disabled={isLoading}
                  size='icon'
                >
                  <UpArrowIcon />
                </Button>
              </div>
              <div className='text-sm text-primary/70'>GPT-4o-mini</div>
            </div>
            {error && (
              <div className='text-red-400 font-semibold mt-0.5 text-sm pl-1.5'>
                Error performing search 😢 Please try again.
              </div>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            {/* <div className={cn('text-sm pl-1')}>
              <span className='text-primary/90'>Results & summary </span>
              <span className='text-primary/70'>
                (By correlation, highest to lowest)
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='inline-flex ml-0.5'>
                      <InfoIcon />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Showing the top five results, <br />
                      with higher values reflecting stronger similarity
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div> */}
            <div className='grid grid-cols-[minmax(17rem,_0.3fr)_1fr] gap-3'>
              <VectorSearchResult
                search={searchRef.current}
                searchResults={results}
                isLoading={isLoading}
              />
              <Streaming search={searchRef.current} searchResults={results} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default VectorSearch
