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
import {
  ChatGPTIcon,
  CubeTransparentIcon,
  GeminiIcon,
  UpArrowIcon,
} from '@/components/Icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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

  // FIXME: move local storage helper function into useEffect to prevent SSR error
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
        <CubeTransparentIcon className='mr-2 animate-spin animate-duration-[3000ms] animate-infinite animate-ease-in-out' />
        Vector Search
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='flex min-h-[95dvh] max-w-[95%] flex-col gap-1.5 px-2 pb-2 pt-4 md:min-h-fit md:max-w-4xl md:p-6 md:px-5 md:py-[1.35rem] xl:max-w-5xl'>
          <DialogHeader className='flex flex-col items-center'>
            <DialogTitle className='relative mb-5 mt-6 flex items-center justify-center font-garamond text-2xl md:mb-3 md:text-3xl'>
              <CubeTransparentIcon
                className={cn(
                  'absolute h-7 w-7 md:h-9 md:w-9',
                  wholeLoading
                    ? 'opacity-0'
                    : 'animate-jumpyy opacity-100 animate-duration-[300ms] animate-once',
                )}
              />
              <div
                className={cn(
                  'absolute transition-opacity duration-200',
                  wholeLoading
                    ? 'block animate-jumpyy opacity-100 animate-duration-[300ms] animate-once'
                    : 'opacity-0',
                )}
              >
                🤔
              </div>
              {/* Expand your consciousness */}
            </DialogTitle>
          </DialogHeader>
          {/* Search input box */}
          <div className='order-last flex flex-col items-center md:order-none md:mb-6 md:mt-3'>
            <div className='z-20 mx-auto flex w-full max-w-2xl flex-col rounded-2xl bg-secondary pb-2.5 pl-3 pr-2.5 pt-2.5 text-primary sm:mx-0'>
              <div className='flex w-full justify-between'>
                <div className='mb-2 mr-3 mt-1 max-h-96 min-h-[3.5rem] w-full flex-1 overflow-y-auto break-words md:min-h-[4.5rem]'>
                  <ProseMirror
                    mount={mount}
                    state={editorState}
                    dispatchTransaction={(tr) => {
                      setEditorState((s) => s.apply(tr))
                    }}
                  >
                    <div
                      data-placeholder='text'
                      className='relative focus:outline-none'
                      ref={setMount}
                    />
                  </ProseMirror>
                </div>
                <Button
                  onClick={handleSearchButtonClick}
                  className={cn(
                    'flex bg-primary text-secondary transition-opacity duration-200 disabled:cursor-not-allowed',
                    !search
                      ? 'opacity-0'
                      : 'animate-jumpyy opacity-100 animate-duration-[300ms] animate-once',
                  )}
                  disabled={wholeLoading}
                  size='icon'
                >
                  <UpArrowIcon className='h-4 w-4 md:h-5 md:w-5' />
                </Button>
              </div>
              <Select>
                <SelectTrigger className='h-6 w-max gap-1 rounded-[0.5rem] border-none bg-secondary px-2.5 py-2 transition-colors hover:bg-primary-foreground'>
                  <SelectValue placeholder='Model' />
                </SelectTrigger>
                <SelectContent className='text-sm text-primary/70'>
                  <SelectItem
                    value='gpt-4o-mini'
                    className='transition-colors hover:bg-secondary'
                  >
                    <div className='grid grid-cols-[0.2fr_1fr] items-center gap-1'>
                      <span className='px-0.5'>
                        <ChatGPTIcon className='h-4 w-4' />
                      </span>
                      <span>GPT 4o mini</span>
                    </div>
                  </SelectItem>
                  <SelectItem
                    value='gemini-1.5-flash'
                    className='transition-colors hover:bg-secondary'
                  >
                    <div className='grid grid-cols-[0.2fr_1fr] items-center gap-1'>
                      <GeminiIcon />
                      <span>Gemini 1.5 Flash</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* <div className='max-w-2xl w-full pl-4 pr-2.5 pb-2.5 sm:mx-0 z-10'>
              <div className='pt-3.5 rounded-b-2xl bg-primary/70 -mt-1.5'>
                Expand your consciousness
              </div>
            </div> */}
            {error && (
              <div className='mt-0.5 pl-1.5 text-sm font-semibold text-red-400'>
                Error performing search 😢 Please try again.
              </div>
            )}
          </div>
          <div className='flex flex-1 flex-col gap-1.5 md:grid md:grid-cols-[minmax(17rem,_0.3fr)_1fr] md:gap-2.5'>
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
        </DialogContent>
      </Dialog>
    </>
  )
}

export default VectorSearch
