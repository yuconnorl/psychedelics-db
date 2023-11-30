'use client'

import { useEffect, useState } from 'react'
import {
  Highlight,
  SearchBox,
  useHits,
  useInstantSearch,
} from 'react-instantsearch'
import { InstantSearchNext } from 'react-instantsearch-nextjs'
import algoliasearch from 'algoliasearch/lite'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import {
  ArticleIcon,
  ChevronRightUp,
  FacebookIcon,
  InstagramIcon,
  PodcastIcon,
  PsychedelicDBLogo,
  Search,
  ThesisIcon,
  TwitterIcon,
  VideoIcon,
  WebsiteIcon,
  YoutubeIcon,
} from './Icons'

import { Dialog, DialogContent } from '@/components/CustomDialog'
import { capitalizeFirstLetter, cn } from '@/lib/utils'

const SearchingBox = ({ onButtonClick, className }) => {
  return (
    <button
      type='button'
      className={cn(
        'flex items-center ring-1 ring-muted bg-input px-4 h-10 rounded-md justify-between hover:bg-muted-foreground/30 transition-colors',
        className,
      )}
      onClick={() => onButtonClick(true)}
    >
      <div className='flex items-center'>
        <Search className='text-muted-foreground mr-2' />
        <div className='text-sm text-muted-foreground'>Open the door...</div>
      </div>
      <kbd className='flex items-center gap-1 text-foreground/70'>
        <abbr className='no-underline text-lg'>⌘</abbr>
        <span className='text-sm'>K</span>
      </kbd>
    </button>
  )
}

const HitItem = ({ hits, onHitClick }) => {
  const iconMap = {
    video: <VideoIcon className='text-primary/80' />,
    'youtube-channel': <YoutubeIcon className='text-primary/80' />,
    instagram: <InstagramIcon className='text-primary/80' />,
    twitter: <TwitterIcon className='text-primary/80' />,
    facebook: <FacebookIcon className='text-primary/80' />,
    podcast: <PodcastIcon className='text-primary/80' />,
    article: <ArticleIcon className='text-primary/80' />,
    website: <WebsiteIcon className='text-primary/80' />,
    thesis: <ThesisIcon className='text-primary/80' />,
    pdf: <ThesisIcon className='text-primary/80' />,
    book: <ThesisIcon className='text-primary/80' />,
  }

  return (
    <div className=''>
      {hits.map((hit) => (
        <div onClick={() => onHitClick(false)}>
          <Link
            className='group my-2 sm:my-3 flex items-center px-2 sm:px-3 py-3 rounded-sm bg-muted-foreground/5 hover:bg-muted-foreground/30 transition-colors'
            href={`/database/${hit.category}/${hit.slug}`}
          >
            <div className='p-1 flex items-center justify-center mr-1 sm:mr-2'>
              {iconMap[hit.type]}
            </div>
            <Highlight
              hit={hit}
              attribute='title'
              className='Hit-label block flex-[1_1_0]'
              classNames={{
                highlighted: 'bg-transparent text-primary font-semibold',
                nonHighlighted: 'text-muted-foreground',
                root: 'text-sm',
              }}
            />
            <ChevronRightUp className='opacity-0 group-hover:opacity-100 transition-opacity' />
          </Link>
        </div>
      ))}
    </div>
  )
}

const NoResultsBoundary = ({ children, fallback }): JSX.Element => {
  const { results } = useInstantSearch()

  // The `__isArtificial` flag makes sure not to display the No Results message
  // when no hits have been returned.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    )
  }

  return children
}

const NoResults = (): JSX.Element => {
  return (
    <div className='flex items-center justify-center relative'>
      <PsychedelicDBLogo className='absolute w-64 h-64 text-muted-foreground/10' />
      <p className='text-muted-foreground'>Try searching for something cool</p>
    </div>
  )
}

const CustomHits = (props): JSX.Element => {
  const { hits } = useHits(props)

  const hitMap = {}
  const sortedHits = hits.sort((a, b) => a.type.localeCompare(b.type))

  sortedHits.forEach((hit) => {
    hitMap[hit.type] ? hitMap[hit.type].push(hit) : (hitMap[hit.type] = [hit])
  })

  return (
    <div className='overflow-scroll flex-1 px-6 py-4 basis-60'>
      {Object.keys(hitMap).map((type) => (
        <section key={type} className=''>
          <div className='pt-4 mb-3 font-semibold'>
            {capitalizeFirstLetter(type)}
          </div>
          <HitItem hits={hitMap[type]} onHitClick={props.onHitClick} />
        </section>
      ))}
    </div>
  )
}

// const algoliaClient = algoliasearch(
//   process.env.ALGOLIA_APP_ID,
//   process.env.ALGOLIA_SEARCH_KEY,
// )

const SearchButton = ({ className }): JSX.Element => {
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
    <>
      <SearchingBox className={className} onButtonClick={setOpen} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <InstantSearchNext
            indexName='psychedelic_db'
            searchClient={searchClient}
            routing
          >
            <div className='flex items-center gap-3 p-6 border-b'>
              <Search className='text-muted-foreground' />
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
            <NoResultsBoundary fallback={<NoResults />}>
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

export default SearchButton
