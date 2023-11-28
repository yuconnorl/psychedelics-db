'use client'

import { useEffect, useState } from 'react'
import { Highlight, Hits, SearchBox, useHits } from 'react-instantsearch'
import { InstantSearchNext } from 'react-instantsearch-nextjs'
import algoliasearch from 'algoliasearch/lite'
import Image from 'next/image'
import Link from 'next/link'

import { Search } from './Icons'

import { Dialog, DialogContent, DialogFooter } from '@/components/CustomDialog'

// TODO: 1. close dialog on click items

const transformItems = (items) => {
  return items.sort((a, b) => a.type.localeCompare(b.type))
}

const Hit = ({ hit }) => {
  return (
    <div className=''>
      <Link href={`/database/${hit.category}/${hit.slug}`}>
        <Highlight hit={hit} attribute='name' className='Hit-label' />
        <span className='Hit-price'>{hit.title}</span>
      </Link>
    </div>
  )
}

const HitItem = ({ hits }) => {
  return (
    <div className=''>
      {hits.map((hit) => (
        <Link className='my-2' href={`/database/${hit.category}/${hit.slug}`}>
          <Highlight hit={hit} attribute='title' className='Hit-label' />
        </Link>
      ))}
    </div>
  )
}

function CustomHits(props) {
  const { hits, sendEvent } = useHits(props)
  const hitMap = {}
  const sortedHits = hits.sort((a, b) => a.type.localeCompare(b.type))

  sortedHits.forEach((hit) => {
    hitMap[hit.type] ? hitMap[hit.type].push(hit) : (hitMap[hit.type] = [hit])
  })

  return (
    <div className='overflow-scroll flex-1 px-6 py-4'>
      {Object.keys(hitMap).map((type) => (
        <section key={type} className='my-4'>
          {type}
          <div>
            <HitItem hits={hitMap[type]} />
          </div>
        </section>
      ))}
      {/* {updatedHits.map((hit) => (
        <section
          key={hit.objectID}
          onClick={() => sendEvent('click', hit, 'Hit Clicked')}
          onAuxClick={() => sendEvent('click', hit, 'Hit Clicked')}
        >
          {!hit.isSameType && (
            <div className='text-lg mb-4 mt-4'>{hit.type}</div>
          )}
          <Highlight
            attribute='title'
            hit={hit}
            classNames={{
              root: 'MyCustomHighlight',
              highlighted: 'text-primary  font-semibold bg-transparent',
              nonHighlighted: ' text-muted-foreground',
            }}
          />
        </section>
      ))} */}
    </div>
  )
}

const SearchButton = (): JSX.Element => {
  const algoliaClient = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_SEARCH_KEY,
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
  }

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
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='h-[50vh]'>
          <InstantSearchNext
            indexName='psychedelic_db'
            searchClient={searchClient}
            routing
          >
            <div className='flex items-center gap-3 p-6 border-b'>
              <Search className='text-muted-foreground' />
              <SearchBox
                placeholder={'Search database'}
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
            <CustomHits />
            {/* <Hits
              hitComponent={Hit}
              transformItems={transformItems}
              classNames={{
                root: 'overflow-scroll flex-1 px-6 py-4',
                list: 'MyCustomHitsList MyCustomHitsList--subclass',
              }}
            /> */}
          </InstantSearchNext>
          <DialogFooter className='border-t items-center p-4'>
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
              ></Image>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SearchButton
