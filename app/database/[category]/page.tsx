import { Suspense } from 'react'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import { getAllRecords } from '@/api/general'
import Breadcrumbs from '@/components/Breadcrumbs'
import CardContainer from '@/components/CardContainer'
import Grid from '@/components/GridLayoutCard'
import Stack from '@/components/StackLayoutCard'
import { CATEGORY_OPTIONS_MAP } from '@/config/options'
import { CardParamsProps, CategoryOptionsType, RecordType } from '@/types'

export async function generateStaticParams(): Promise<
  Record<'category', CategoryOptionsType>[]
> {
  const records = await getAllRecords()

  return records.map((record: RecordType) => ({
    category: record.category,
  }))
}

export async function generateMetadata(
  { params }: CardParamsProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentData = (await parent) as Metadata
  const parentOpenGraph = parentData.openGraph
  const parentTwitter = parentData.twitter

  return {
    title: CATEGORY_OPTIONS_MAP[params.category],
    openGraph: {
      title: CATEGORY_OPTIONS_MAP[params.category],
      images: parentOpenGraph.images,
    },
    twitter: {
      card: 'summary_large_image',
      title: CATEGORY_OPTIONS_MAP[params.category],
      images: parentTwitter.images,
    },
  }
}

const CategoryPage = async ({
  params,
}: CardParamsProps): Promise<JSX.Element> => {
  const records = await getAllRecords()

  const filterRecord = records.filter(
    (record) => record.category === params.category,
  )

  if (!filterRecord.length) {
    notFound()
  }

  return (
    <div className=''>
      <Breadcrumbs
        items={[
          { label: 'Database', url: '/database' },
          {
            label: `${CATEGORY_OPTIONS_MAP[params.category]}`,
            url: `/database/${params.category}`,
          },
        ]}
      />
      <h2 className='text-3xl md:text-5xl font-semibold mb-6'>
        {CATEGORY_OPTIONS_MAP[params.category]}
      </h2>
      <div className='flex flex-col gap-4 relative'>
        <Suspense fallback={<div>Cardcontainer</div>}>
          <CardContainer>
            <Grid params={params} />
            <Stack params={params} />
          </CardContainer>
        </Suspense>
      </div>
    </div>
  )
}

export default CategoryPage
