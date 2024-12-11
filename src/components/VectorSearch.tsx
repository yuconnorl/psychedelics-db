'use client'

import { useCallback, useEffect, useState } from 'react'
import { ProseMirror, react } from '@nytimes/react-prosemirror'
import { schema } from 'prosemirror-schema-basic'
import { EditorState } from 'prosemirror-state'
import { toast } from 'sonner'
import useSWR from 'swr'

import { getEmbedding, queryVector } from '../utilities/paperDetail'
import VectorSearchResult from './VectorSearchResult'

import CompletionResult from '@/components/CompletionResult'
import { CubeTransparentIcon, UpArrowIcon } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { localStorageHelper } from '@/utilities/localStorage'

const VectorSearch = () => {
  const [search, setSearch] = useState('')
  const [mount, setMount] = useState<HTMLElement | null>(null)
  const [editorState, setEditorState] = useState<EditorState | null>(
    EditorState.create({
      schema,
      plugins: [react()],
    }),
  )
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [wholeLoading, setWholeLoading] = useState(false)

  const vectorSearchResultCache = localStorageHelper.get(
    'vector-search-result-cache',
  )

  const searchFetcher = async (searchTerm: string) => {
    if (!searchTerm) return []

    localStorageHelper.remove('vector-search-result-cache')
    localStorageHelper.remove('completion-cache')
    setWholeLoading(true)
    const { embedding } = await getEmbedding(searchTerm)
    const { queryResults } = await queryVector(embedding)

    return queryResults?.points || []
  }

  const {
    data: results = [],
    error,
    isLoading: isVectorSearchLoading,
  } = useSWR(
    debouncedSearch ? ['vectorSearch', debouncedSearch] : null,
    ([_, term]) => searchFetcher(term),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
      dedupingInterval: 5000,
      onSuccess: (data) => {
        localStorageHelper.set('vector-search-result-cache', data)
      },
      onError: (err) => {
        // eslint-disable-next-line no-console
        console.log('SWR fetch error message: ', err)
        toast.warning('Something went wrong 😢. Please try again')
      },
    },
  )

  const vectorSearchResult = results.length ? results : vectorSearchResultCache

  const handleSearchButtonClick = useCallback(() => {
    if (!search) {
      toast.warning('Please input prompt to search')
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

  useEffect(() => {
    setSearch(editorState.doc.toJSON()?.content?.[0]?.content?.[0]?.text)
  }, [editorState])

  return (
    <>
      <Button className='mb-3' onClick={() => setOpen(true)}>
        <CubeTransparentIcon className='mr-2 animate-spin animate-infinite animate-duration-[3000ms] animate-ease-in-out' />
        Vector Search
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-[90%] md:max-w-4xl xl:max-w-5xl px-5 py-[1.35rem] md:p-6'>
          <DialogHeader className='flex flex-col items-center'>
            <DialogTitle className='flex relative font-garamond justify-center items-center mt-6 mb-3 text-2xl md:text-3xl'>
              <CubeTransparentIcon
                className={cn(
                  'w-7 h-7 md:w-9 md:h-9 absolute',
                  wholeLoading
                    ? 'opacity-0'
                    : 'opacity-100 animate-jumpyy animate-once animate-duration-[300ms]',
                )}
              />
              <div
                className={cn(
                  'transition-opacity duration-200 absolute',
                  wholeLoading
                    ? 'block opacity-100 animate-jumpyy animate-once animate-duration-[300ms]'
                    : 'opacity-0',
                )}
              >
                🤔
              </div>
              {/* Expand your consciousness */}
            </DialogTitle>
          </DialogHeader>
          {/* Search input box */}
          <div className='flex flex-col items-center mt-3 mb-4 md:mb-6'>
            <div className='flex flex-col w-full mx-auto max-w-2xl bg-secondary text-primary pl-4 pt-2.5 pr-2.5 pb-2.5 sm:mx-0 rounded-2xl z-20'>
              <div className='flex w-full justify-between'>
                <div className='mt-1 max-h-96 flex-1 w-full overflow-y-auto break-words min-h-[4.5rem] mb-2 mr-3'>
                  <ProseMirror
                    mount={mount}
                    state={editorState}
                    dispatchTransaction={(tr) => {
                      setEditorState((s) => s.apply(tr))
                    }}
                  >
                    <div
                      data-placeholder='text'
                      className='focus:outline-none relative'
                      ref={setMount}
                    />
                  </ProseMirror>
                </div>
                <Button
                  onClick={handleSearchButtonClick}
                  className={cn(
                    'flex disabled:cursor-not-allowed text-secondary bg-primary transition-opacity duration-200',
                    !search
                      ? 'opacity-0'
                      : 'opacity-100 animate-jumpyy animate-once animate-duration-[300ms]',
                  )}
                  disabled={wholeLoading}
                  size='icon'
                >
                  <UpArrowIcon className='w-4 h-4 md:w-5 md:h-5' />
                </Button>
              </div>
              <div className='text-sm text-primary/70'>GPT-4o-mini</div>
            </div>
            {/* <div className='max-w-2xl w-full pl-4 pr-2.5 pb-2.5 sm:mx-0 z-10'>
              <div className='pt-3.5 rounded-b-2xl bg-primary/70 -mt-1.5'>
                Expand your consciousness
              </div>
            </div> */}
            {error && (
              <div className='text-red-400 font-semibold mt-0.5 text-sm pl-1.5'>
                Error performing search 😢 Please try again.
              </div>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <div className='grid grid-cols-[minmax(17rem,_0.3fr)_1fr] gap-2.5'>
              <VectorSearchResult
                searchResults={vectorSearchResult}
                isLoading={isVectorSearchLoading}
              />
              <CompletionResult
                wholeLoading={wholeLoading}
                setWholeLoading={setWholeLoading}
                search={search}
                searchResults={results}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default VectorSearch
