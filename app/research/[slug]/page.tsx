import { Fragment } from 'react'
import dayjs from 'dayjs'
import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPapers } from '@/api/general'
import Breadcrumbs from '@/components/Breadcrumbs'
import IconsWithSprite from '@/components/IconsWithSprite'
import SerializeSlate from '@/components/SerializeSlate'
import { Badge } from '@/components/ui/badge'
import { substanceOptions } from '@/config/options'
import { PaperData } from '@/types'

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

export async function generateMetadata(
  { params }: ParamsType,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const papers = await getPapers()
  const filterPaper = papers.find(
    (paper: PaperData) => paper.slug === params.slug,
  )

  const parentData = (await parent) as Metadata
  const parentOpenGraph = parentData.openGraph
  const parentTwitter = parentData.twitter

  return {
    title: filterPaper.title,
    openGraph: {
      title: filterPaper.title,
      images: parentOpenGraph.images,
    },
    twitter: {
      card: 'summary_large_image',
      title: filterPaper.title,
      images: parentTwitter.images,
    },
  }
}

const PaperPage = async ({ params }: ParamsType): Promise<JSX.Element> => {
  const papers = await getPapers()
  const filterPaper = papers.find(
    (paper: PaperData) => paper.slug === params.slug,
  )

  if (!filterPaper) {
    notFound()
  }

  const {
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
    <div className='py-6'>
      <Breadcrumbs
        items={[
          { label: 'Research', url: '/research' },
          {
            label: `${title}`,
            url: `/research/${params.slug}`,
          },
        ]}
      />
      <article className='grid grid-cols-[1fr_0.5fr] gap-5 divide-x'>
        <div className='px-3'>
          <h1 className='text-5xl mb-16 font-medium font-garamond'>{title}</h1>
          <div className='font-medium mb-3'>Abstract</div>
          {abstract && (
            <>
              <div className='text-primary prose-lg'>
                <SerializeSlate value={abstract} />
              </div>
            </>
          )}
        </div>
        <aside className='pl-6 pr-5 pt-28 flex flex-col gap-5'>
          <section>
            <h3 className='font-medium mb-3'>Journal</h3>
            <div className='text-primary/80'>{journal}</div>
          </section>
          <section>
            <h3 className='font-medium mb-3'>Authors</h3>
            <div className='text-primary/80'>
              {authors.length > 1
                ? authors.map((author) => (
                    <Fragment key={author}>
                      <span className='whitespace-nowrap'>{`${author}`}</span>
                      {', '}
                    </Fragment>
                  ))
                : authors[0]}
            </div>
          </section>
          <section>
            <h3 className='font-medium mb-3'>Keywords</h3>
            <div className='text-primary/80'>
              {keywords.map((keyword) => (
                <Fragment key={keyword}>
                  <span className='whitespace-nowrap'>{`${keyword}`}</span>
                  {', '}
                </Fragment>
              ))}
            </div>
          </section>
          <section>
            <h3 className='font-medium mb-3'>DOI</h3>
            <div className='text-primary/80'>{doi}</div>
          </section>
          <section>
            <h3 className='font-medium mb-3'>Link</h3>
            <Link
              href={url}
              prefetch={false}
              target='_blank'
              className='flex items-center text-primary/80 hover:opacity-50 transition-opacity'
            >
              <>
                <IconsWithSprite id={'link'} class='size-4 mr-1 inline' />
                Link to paper
              </>
            </Link>
          </section>
          <section>
            <h3 className='font-medium mb-3'>Published</h3>
            <time className='text-primary/80'>
              {dayjs(publishedAt).format('MMMM YYYY')}
            </time>
          </section>
          <section>
            {substance.map((sub) => (
              <Badge key={sub} className='mr-1'>
                {substanceOptions[sub]}
              </Badge>
            ))}
          </section>
        </aside>
      </article>
    </div>
  )
}

export default PaperPage
