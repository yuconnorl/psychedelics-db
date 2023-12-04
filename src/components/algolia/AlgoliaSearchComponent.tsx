'use client'

import { useEffect, useState } from 'react'
import { SearchBox } from 'react-instantsearch'
import { InstantSearchNext } from 'react-instantsearch-nextjs'
import algoliasearch from 'algoliasearch/lite'
import Image from 'next/image'
import Link from 'next/link'

import { SearchIcon } from '../Icons'
import SearchButton from '../SearchButton'
import CustomHits from './CustomHits'
import NoResultsBoundary from './NoResultsBoundary'
import NoResultsFallback from './NoResultsFallback'

import { Dialog, DialogContent } from '@/components/CustomDialog'

type SearchButtonProps = {
  className?: string
}

const AlgoliaSearchComponent = ({
  className,
}: SearchButtonProps): JSX.Element => {
  const algoliaClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
  )

  // return nothing if the user did not enter a search query
  const searchClient = {
    ...algoliaClient,
    search(requests) {
      if (requests.every(({ params }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            hitsPerPage: 0,
            exhaustiveNbHits: false,
            query: '',
            params: '',
          })),
        })
      }

      return algoliaClient.search(requests)
    },
  } as any

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <SearchButton className={className} onButtonClick={setOpen} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <InstantSearchNext
            indexName='psychedelic_db'
            searchClient={searchClient}
          >
            <div className='flex items-center gap-3 p-6 border-b'>
              <SearchIcon className='text-muted-foreground' />
              <SearchBox
                placeholder={'Open the door...'}
                classNames={{
                  root: 'flex-1',
                  form: 'relative',
                  input: 'w-full border-none outline-none bg-transparent',
                }}
                submitIconComponent={() => <></>}
                loadingIconComponent={() => <></>}
                resetIconComponent={() => <></>}
              />
            </div>
            <NoResultsBoundary fallback={<NoResultsFallback />}>
              <CustomHits onHitClick={setOpen} />
            </NoResultsBoundary>
          </InstantSearchNext>
          <div className='border-t items-center px-6 py-4 flex justify-end'>
            <Link
              href={'https://www.algolia.com/ref/docsearch'}
              className='flex items-center'
            >
              <p className='text-muted-foreground text-xs mr-3 opacity-50'>
                Search by
              </p>
              <Image
                src={'/algolia-logo-blue.svg'}
                width={79}
                height={14}
                alt='Algolia logo'
                aria-label='Algolia'
              />
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AlgoliaSearchComponent
