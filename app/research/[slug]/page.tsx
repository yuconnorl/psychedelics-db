import { Suspense } from 'react'
import { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAllRecords, getCategories, getPapers } from '@/api/general'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ChevronRightUpIcon } from '@/components/Icons'
import SerializeSlate from '@/components/SerializeSlate'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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
    <article>
      <div>{title}</div>
      <div>{slug}</div>
      <div>{authors.join(', ')}</div>
      <div>{journal}</div>
      <div>{keywords.join(', ')}</div>
    </article>
  )
}

export default PaperPage
