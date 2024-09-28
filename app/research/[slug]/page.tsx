import { Fragment, Suspense } from 'react'
import { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAllRecords, getCategories, getPapers } from '@/api/general'
import Breadcrumbs from '@/components/Breadcrumbs'
import { LinkIcon } from '@/components/Icons'
import SerializeSlate from '@/components/SerializeSlate'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { substanceOptions } from '@/config/options'
import { IMAGE_PLACEHOLDER } from '@/constants/constants'
import { capitalizeFirstLetter } from '@/lib/utils'
import { RecordType } from '@/types'

type ParamsType = {
  params: {
    slug: string
  }
}

export async function generateStaticParams(): Promise<
  Record<'slug', string>[]
> {
  const papers = await getPapers()

  return papers.map((paper) => ({
    slug: paper.slug,
  }))
}

// export async function generateMetadata(
//   { params }: ParamsType,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   const records = await getAllRecords()
//   const record = records.find((record) => record.slug === params.slug)

//   const parentData = (await parent) as Metadata
//   const parentOpenGraph = parentData.openGraph
//   const parentTwitter = parentData.twitter

//   return {
//     title: record.title,
//     openGraph: {
//       title: record.title,
//       images: parentOpenGraph.images,
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: record.title,
//       images: parentTwitter.images,
//     },
//   }
// }

const PaperPage = async ({ params }: ParamsType): Promise<JSX.Element> => {
  const papers = await getPapers()

  const filterPaper = papers.find((paper) => paper.slug === params.slug)

  // if (!filterPaper) {
  //   notFound()
  // }

  console.log('fiqwlek')

  console.log(filterPaper)

  const {
    id,
    slug,
    title,
    authors,
    journal,
    abstract,
    keywords,
    doi,
    url,
    substance,
    publishedAt,
  } = filterPaper

  return (
    <article className='py-6'>
      <Breadcrumbs
        items={[
          { label: 'Research', url: '/research' },
          {
            label: `${title}`,
            url: `/research/${params.slug}`,
          },
        ]}
      />
      <div className='grid grid-cols-[1fr_0.5fr] gap-5 divide-x'>
        <div className='px-3'>
          <h1 className='text-5xl mb-16 font-medium font-garamond'>{title}</h1>
          <div></div>
          <div className='font-medium mb-3'>Abstract</div>
          {abstract && (
            <>
              <div className='text-primary prose-lg'>
                <SerializeSlate value={abstract} />
              </div>
            </>
          )}
        </div>
        <div className='pl-6 pr-5 pt-28 flex flex-col gap-5'>
          <div>
            <div className='font-medium mb-3'>Journal</div>
            <div className='text-primary/80'>{journal}</div>
          </div>
          <div>
            <div className='font-medium mb-3'>Authors</div>
            <div className='text-primary/80'>
              {authors.map((author) => (
                <Fragment key={author}>
                  <span className='whitespace-nowrap'>{`${author}`}</span>
                  {', '}
                </Fragment>
              ))}
            </div>
          </div>
          <div>
            <div className='font-medium mb-3'>Keywords</div>
            <div className='text-primary/80'>
              {keywords.map((keyword) => (
                <Fragment key={keyword}>
                  <span className='whitespace-nowrap'>{`${keyword}`}</span>
                  {', '}
                </Fragment>
              ))}
            </div>
          </div>
          <div>
            <div className='font-medium mb-3'>DOI</div>
            <div className='text-primary/80'>{doi}</div>
          </div>
          <div>
            <div className='font-medium mb-3'>Link</div>
            <Link
              href={url}
              prefetch={false}
              target='_blank'
              className='flex items-center text-primary/80 hover:opacity-50 transition-opacity'
            >
              <>
                <LinkIcon className='inline mr-1' />
                Link to the paper
              </>
            </Link>
          </div>
          <div>
            {substance.map((sub) => (
              <Badge key={sub} className='mr-1'>
                {substanceOptions[sub]}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default PaperPage
