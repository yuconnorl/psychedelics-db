'use client'

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'

import { getEmbedding, queryVector } from '../utilities/paperDetail'
import VectorSearchResult from './VectorSearchResult'

import { CubeTransparentIcon } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const searchFetcher = async (searchTerm: string) => {
  if (!searchTerm) return []

  const { embedding } = await getEmbedding(searchTerm)

  const { queryResults } = await queryVector(embedding)

  return queryResults?.points || []
}

const VectorSearch = () => {
  const [search, setSearch] = useState('')
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

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSearchButtonClick = useCallback(() => {
    if (!search) {
      toast.warning('Please input keywords to search')
      return
    }
    setDebouncedSearch(search)
  }, [search])

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
        <DialogContent className='max-w-[90%] md:max-w-2xl px-5 py-[1.35rem] md:p-6'>
          <DialogHeader className='text-left'>
            <DialogTitle className='flex items-center text-xl md:text-2xl'>
              <CubeTransparentIcon
                className={cn(
                  'mr-1.5 md:mr-2 w-5 h-5 md:w-6 md:h-6',
                  isLoading &&
                    'animate-spin animate-infinite animate-duration-[1500ms] animate-ease-in-out',
                )}
              />
              Vector Search
            </DialogTitle>
            <DialogDescription className='max-w-full md:max-w-[90%] px-1 mt-3 md:mt-4'>
              Vector search is an algorithm that transforms data into vectors,
              allowing efficient retrieval of similar items in large datasets by
              comparing their positions in high-dimensional space.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className='flex mt-3 gap-2'>
              <Input
                value={search}
                onChange={handleChange}
                type='text'
                placeholder='Input keywords to search'
                disabled={isLoading}
              />
              <Button
                onClick={handleSearchButtonClick}
                className='flex px-5 disabled:cursor-not-allowed'
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
            {error && (
              <div className='text-red-400 mt-2 text-sm pl-1.5'>
                Error performing search 😢 Please try again.
              </div>
            )}
            <VectorSearchResult searchResults={results} isLoading={isLoading} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default VectorSearch
