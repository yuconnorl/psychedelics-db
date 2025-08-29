import { Suspense } from 'react'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import { getAllRecords, getCategories } from '@/api/general'
import Breadcrumbs from '@/components/Breadcrumbs'
import CardContainer from '@/components/CardContainer'
import Grid from '@/components/GridLayoutCard'
import Stack from '@/components/StackLayoutCard'
import { SITE_URL } from '@/constants/constants'
import { CardParamsProps, RecordType } from '@/types'

export async function generateStaticParams() {
  const records = await getAllRecords()

  return records.map((record: RecordType) => ({
    category: record.category,
  }))
}

export async function generateMetadata(
  { params }: CardParamsProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentData = (await parent) as unknown as Metadata
  const categories = await getCategories()
  const parentOpenGraph = parentData.openGraph
  const parentTwitter = parentData.twitter

  const category = categories.find(
    (category) => category.value === params.category,
  )

  return {
    title: category.displayName,
    alternates: {
      canonical: `${SITE_URL}/database/${params.category}`,
    },
    openGraph: {
      title: category.displayName,
      images: parentOpenGraph.images,
    },
    twitter: {
      card: 'summary_large_image',
      title: category.displayName,
      images: parentTwitter.images,
    },
  }
}

const CategoryPage = async ({
  params,
}: CardParamsProps): Promise<JSX.Element> => {
  const records = await getAllRecords()
  const categories = await getCategories()

  const category = categories.find(
    (category) => category.value === params.category,
  )
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
            label: `${category.displayName}`,
            url: `/database/${params.category}`,
          },
        ]}
      />
      <h2 className='mb-6 text-3xl font-semibold md:text-5xl'>
        {category.displayName}
      </h2>
      <div className='relative flex flex-col gap-4'>
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
