import { Fragment } from 'react'
import dayjs from 'dayjs'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Node } from 'slate'

import { getPapers } from '@/api/general'
import {
  ArrowLeftIcon,
  ChatGPTIcon,
  KeyIcon,
  LinkIcon,
} from '@/components/Icons'
import SerializeSlate from '@/components/SerializeSlate'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { substanceOptions } from '@/config/options'
import { SITE_NAME, SITE_URL } from '@/constants/constants'
import { PaperData } from '@/types'

type ParamsType = {
  params: { slug: string }
}

export const dynamic = 'force-static'

export async function generateStaticParams(): Promise<
  Record<'slug', string>[]
> {
  const papers = await getPapers()

  return papers.map((paper) => ({
    slug: paper.slug,
  }))
}

export async function generateMetadata({
  params,
}: ParamsType): Promise<Metadata> {
  const papers = await getPapers()
  const filterPaper = papers.find(
    (paper: PaperData) => paper.slug === params.slug,
  )

  const serialize = (nodes) => {
    return nodes.map((n) => Node.string(n)).join('\n')
  }

  const abstractString = serialize(filterPaper?.abstract)

  return {
    title: filterPaper?.title,
    description: abstractString,
    openGraph: {
      title: filterPaper?.title,
      url: `${SITE_URL}/research/${filterPaper?.slug}`,
      description: abstractString,
      siteName: SITE_NAME,
      // images: [`/api/og-research?title=${filterPaper.title}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: filterPaper?.title,
      description: abstractString,
      // images: [`/api/og-research?title=${filterPaper.title}`],
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
    summary,
  } = filterPaper

  return (
    <div className='py-6'>
      <Link
        href={'/research'}
        className='flex items-center text-primary/80 mb-10 group text-sm hover:opacity-50 transition-opacity w-fit'
      >
        <ArrowLeftIcon className='mr-1.5 group-hover:-translate-x-1 transition-transform' />
        <>All Researches</>
      </Link>
      <article className='flex flex-col md:grid md:grid-cols-[1fr_0.5fr]'>
        <div className='px-3 md:pr-6 md:border-r'>
          <h1 className='text-4xl md:text-5xl mb-4 font-medium font-garamond'>
            {title}
          </h1>
          <section className='md:mb-10 mb-4 flex gap-1.5'>
            {substance.map((sub) => (
              <Badge key={sub}>{substanceOptions[sub]}</Badge>
            ))}
          </section>
          <Accordion type='single' className='md:hidden mb-8' collapsible>
            <AccordionItem value='paper-detail'>
              <AccordionTrigger className='text-primary/80'>
                Paper Detail
              </AccordionTrigger>
              <AccordionContent>
                <div className='flex flex-col gap-4'>
                  <section>
                    <h3 className='font-medium mb-3'>Journal</h3>
                    <div className='text-primary/80'>{journal}</div>
                  </section>
                  <section>
                    <h3 className='font-medium mb-3'>Authors</h3>
                    <div className='text-primary/80'>
                      {authors.length > 1
                        ? authors.map((author, index) => {
                            return (
                              <Fragment key={author}>
                                <span className='whitespace-nowrap'>
                                  {author}
                                </span>
                                {index !== authors.length - 1 && ', '}
                              </Fragment>
                            )
                          })
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
                        <LinkIcon className='size-4 mr-1 inline' />
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
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {summary.length > 0 && (
            <section className='flex relative flex-col p-5 pb-4 bg-primary-foreground mb-5 rounded-sm'>
              <h3 className='mb-4 flex items-center font-medium'>
                <KeyIcon className='mr-2 inline' />
                Key Findings
              </h3>
              <ul className='flex flex-col gap-3 pl-2 ml-3'>
                {summary.map(({ id, summary }) => (
                  <li
                    className='pl-1 relative before:contents-[""] before:absolute before:w-[0.3rem] before:h-[0.3rem] before:bg-primary/60 before:rounded-full before:-left-[0.8rem] before:top-[0.65rem]'
                    key={id}
                  >
                    {summary}
                  </li>
                ))}
              </ul>
              <div className='text-muted-foreground text-xs flex items-center ml-auto mt-2 opacity-80'>
                <span className='mr-1.5'>Compile with</span>
                <ChatGPTIcon className='inline' />
              </div>
            </section>
          )}
          <section className='pl-2'>
            <div className='font-medium mb-3'>Abstract</div>
            {abstract && (
              <>
                <div className='text-primary prose max-w-full'>
                  <SerializeSlate value={abstract} />
                </div>
              </>
            )}
          </section>
        </div>
        <aside className='pl-4 xl:pl-6 pr-5 pt-28 md:flex flex-col hidden gap-5 top-1 md:sticky md:h-max'>
          <section>
            <h3 className='font-medium mb-3'>Journal</h3>
            <div className='text-primary/80'>{journal}</div>
          </section>
          <section>
            <h3 className='font-medium mb-3'>Authors</h3>
            <div className='text-primary/80'>
              {authors.length > 1
                ? authors.map((author, index) => {
                    return (
                      <Fragment key={author}>
                        <span className='whitespace-nowrap'>{author}</span>
                        {index !== authors.length - 1 && ', '}
                      </Fragment>
                    )
                  })
                : authors[0]}
            </div>
          </section>
          <section>
            <h3 className='font-medium mb-3'>Keywords</h3>
            <div className='text-primary/80'>
              {keywords.length > 1
                ? keywords.map((keyword, index) => {
                    return (
                      <Fragment key={keyword}>
                        <span className='whitespace-nowrap'>{keyword}</span>
                        {index !== keywords.length - 1 && ', '}
                      </Fragment>
                    )
                  })
                : keywords[0]}
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
                <LinkIcon className='size-4 mr-1 inline' />
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
        </aside>
      </article>
    </div>
  )
}

export default PaperPage
