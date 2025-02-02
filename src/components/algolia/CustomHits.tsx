/* eslint-disable import/named */
'use client'

import type { UseHitsProps } from 'react-instantsearch'
import { Highlight, useHits } from 'react-instantsearch'
import Link from 'next/link'

import {
  ArticleIcon,
  ChevronRightUpIcon,
  DocumentIcon,
  FacebookIcon,
  InstagramIcon,
  PodcastIcon,
  ThesisIcon,
  TwitterIcon,
  VideoIcon,
  WebsiteIcon,
  YoutubeIcon,
} from '../Icons'

import { capitalizeFirstLetter } from '@/lib/utils'

const HitItem = ({ hits, onHitClick }): JSX.Element => {
  const iconMap = {
    video: <VideoIcon />,
    'youtube-channel': <YoutubeIcon />,
    instagram: <InstagramIcon />,
    twitter: <TwitterIcon />,
    facebook: <FacebookIcon />,
    podcast: <PodcastIcon />,
    article: <ArticleIcon />,
    website: <WebsiteIcon />,
    thesis: <ThesisIcon />,
    pdf: <ThesisIcon />,
    book: <ThesisIcon />,
    paper: <DocumentIcon />,
  }

  return (
    <>
      {hits.map((hit) => {
        const isPaperType = Boolean(hit?.type === undefined && hit.doi)
        const linkHerf = isPaperType
          ? `/research/${hit.slug}`
          : `/database/${hit.category}/${hit.slug}`
        const icon: JSX.Element = isPaperType
          ? iconMap.paper
          : iconMap[hit.type]

        return (
          <div key={hit.objectID} onClick={() => onHitClick(false)}>
            <Link
              className='group my-2 flex items-center rounded-sm bg-muted-foreground/5 px-2 py-3 transition-colors hover:bg-muted-foreground/30 sm:my-3 sm:px-3'
              href={linkHerf}
              prefetch={false}
            >
              <div className='mr-1 flex items-center justify-center p-1 text-primary/80 sm:mr-2'>
                {icon}
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
              <ChevronRightUpIcon className='opacity-0 transition-opacity group-hover:opacity-100' />
            </Link>
          </div>
        )
      })}
    </>
  )
}

type HitProps = UseHitsProps & {
  onHitClick: (isSearchBoxOpen: boolean) => void
}

// FIXME: TypeScript Any
// For displaying result that match the query (hit!)
const CustomHits = (props: HitProps): JSX.Element => {
  const { hits } = useHits(props)
  const hitMap: { [key: string]: any[] } = {}

  hits.forEach((hit: any) => {
    const type = hit.type ?? 'research'
    if (hitMap[type]) {
      hitMap[type].push(hit)
    } else {
      hitMap[type] = [hit]
    }
  })

  return (
    <div className='flex-1 basis-60 overflow-scroll px-6 py-4'>
      {Object.keys(hitMap).map((type) => (
        <section key={type}>
          <div className='mb-3 pt-4 font-semibold'>
            {capitalizeFirstLetter(type)}
          </div>
          <HitItem hits={hitMap[type]} onHitClick={props.onHitClick} />
        </section>
      ))}
    </div>
  )
}

export default CustomHits
