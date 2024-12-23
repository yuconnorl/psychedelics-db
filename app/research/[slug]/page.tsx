import { Fragment } from 'react'
import dayjs from 'dayjs'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Node } from 'slate'

import RecommandSection from '../RecommendSectoin'

import { getPapers } from '@/api/general'
import CopyButton from '@/components/CopyButton'
import {
  ArrowLeftIcon,
  ChatGPTIcon,
  KeyIcon,
  LinkIcon,
} from '@/components/Icons'
import SerializeSlate from '@/components/SerializeSlate'
import SubstanceBadge from '@/components/SubstanceBadge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
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
      images: [`/api/og-research?title=${filterPaper.title}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: filterPaper?.title,
      description: abstractString,
      images: [`/api/og-research?title=${filterPaper.title}`],
    },
  }
}

const PaperPage = async ({ params }: ParamsType): Promise<JSX.Element> => {
  const papers = await getPapers()
  const filterPaper = papers.find(
    (paper: PaperData) => paper.slug === params.slug,
  )

  const recommendPapers = papers
    .filter((paper: PaperData) => paper.slug !== filterPaper.slug)
    .filter((paper: PaperData) =>
      paper.substance.some((sub) => sub === filterPaper.substance[0]),
    )
    .slice(0, 3)

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
        className='group mb-10 flex w-fit items-center text-sm text-primary/80 transition-opacity hover:opacity-50'
      >
        <ArrowLeftIcon className='mr-1.5 transition-transform group-hover:-translate-x-1' />
        <>All Researches</>
      </Link>
      <article className='flex flex-col md:grid md:grid-cols-[1fr_0.5fr]'>
        <div className='md:border-r md:pl-3 md:pr-6'>
          <h1 className='group mb-4 font-garamond text-4xl font-medium md:text-5xl'>
            {title}
            <CopyButton
              text={title}
              className='opacity-0 group-hover:opacity-100'
            />
          </h1>
          <section className='mb-4 flex gap-1.5 md:mb-10'>
            {substance.map((sub) => (
              <SubstanceBadge key={sub} substance={sub} />
            ))}
          </section>

          {/* Paper Detail Accordion for mobile */}
          <Accordion type='single' className='mb-5 md:hidden' collapsible>
            <AccordionItem value='paper-detail'>
              <AccordionTrigger className='text-primary/80'>
                Paper Detail
              </AccordionTrigger>
              <AccordionContent>
                <div className='flex flex-col gap-3'>
                  <section>
                    <h3 className='mb-1 font-medium'>Journal</h3>
                    <div className='text-primary/80'>{journal}</div>
                  </section>
                  <section>
                    <h3 className='mb-1 font-medium'>Authors</h3>
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
                    <h3 className='mb-1 font-medium'>Keywords</h3>
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
                    <h3 className='mb-1 font-medium'>DOI</h3>
                    <div className='flex items-center text-primary/80'>
                      {doi}
                      <CopyButton text={doi} />
                    </div>
                  </section>
                  <section>
                    <h3 className='mb-1 font-medium'>Link</h3>
                    <Link
                      href={url}
                      prefetch={false}
                      target='_blank'
                      className='flex w-max items-center text-primary/80 transition-opacity hover:opacity-50'
                    >
                      <>
                        <LinkIcon className='mr-1 inline size-4' />
                        Link to paper
                      </>
                    </Link>
                  </section>
                  <section>
                    <h3 className='mb-1 font-medium'>Published</h3>
                    <time className='text-primary/80'>
                      {dayjs(publishedAt).format('MMMM YYYY')}
                    </time>
                  </section>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {summary.length > 0 && (
            <section className='relative mb-5 flex flex-col rounded-sm bg-primary-foreground p-4 pb-4 md:p-5'>
              <h3 className='mb-4 flex items-center font-medium'>
                <KeyIcon className='mr-2 inline' />
                Key Findings
              </h3>
              <ul className='prose ml-2 flex flex-col pl-2 text-primary md:ml-3'>
                {summary.map(({ id, summary }) => (
                  <li
                    className='before:contents-[""] relative before:absolute before:-left-[0.8rem] before:top-[0.75rem] before:h-[0.3rem] before:w-[0.3rem] before:rounded-full before:bg-primary/60 md:pl-1'
                    key={id}
                  >
                    {summary}
                  </li>
                ))}
              </ul>
              <div className='ml-auto mt-2 flex items-center text-xs text-muted-foreground opacity-80'>
                <span className='mr-1.5'>Compile with</span>
                <ChatGPTIcon className='inline' />
              </div>
            </section>
          )}
          <section className='pl-2'>
            <div className='mb-3 font-medium'>Abstract</div>
            {abstract && (
              <>
                <div className='prose max-w-full text-primary prose-strong:text-primary'>
                  <SerializeSlate value={abstract} />
                </div>
              </>
            )}
          </section>
          <RecommandSection recommendPapers={recommendPapers} />
        </div>
        {/* Paper Detail for desktop */}
        <aside className='top-1 hidden flex-col gap-5 pl-4 pr-5 pt-28 md:sticky md:flex md:h-max xl:pl-6'>
          <section>
            <h3 className='mb-3 font-medium'>Journal</h3>
            <div className='text-primary/80'>{journal}</div>
          </section>
          <section>
            <h3 className='mb-3 font-medium'>Authors</h3>
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
            <h3 className='mb-3 font-medium'>Keywords</h3>
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
            <h3 className='mb-3 font-medium'>DOI</h3>
            <div className='flex items-center text-primary/80'>
              {doi}
              <CopyButton text={doi} />
            </div>
          </section>
          <section>
            <h3 className='mb-3 font-medium'>Link</h3>
            <Link
              href={url}
              prefetch={false}
              target='_blank'
              className='flex w-max items-center text-primary/80 transition-opacity hover:opacity-50'
            >
              <>
                <LinkIcon className='mr-1 inline size-4' />
                Link to paper
              </>
            </Link>
          </section>
          <section>
            <h3 className='mb-3 font-medium'>Published</h3>
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
