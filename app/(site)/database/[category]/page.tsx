import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getAllRecords } from '@api/general'
import Breadcrumbs from '@components/Breadcrumbs'
import CardContainer from '@components/CardContainer'
import Grid from '@components/GridLayoutCard'
import Stack from '@components/StackLayoutCard'
import { CATEGORY_OPTIONS_MAP } from '@configs/options'
import { CardParamsProps, CategoryOptionsType, RecordType } from '@types'

export async function generateStaticParams(): Promise<
  Record<'category', CategoryOptionsType>[]
> {
  const records = await getAllRecords()

  return records.map((record: RecordType) => ({
    category: record.category,
  }))
}

export async function generateMetadata({
  params,
}: CardParamsProps): Promise<Metadata> {
  return {
    title: CATEGORY_OPTIONS_MAP[params.category],
    // description: `All Posts of ${params.category}`,
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
