import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAllRecords } from '@/api/general'
import Breadcrumbs from '@/components/Breadcrumbs'
import { CATEGORY_OPTIONS_MAP } from '@/config/options'
import { RecordType } from '@/types'

type ParamsType = {
  params: {
    slug: string
  }
}

export async function generateStaticParams(): Promise<Record<'slug', string>[]> {
  const records = await getAllRecords()

  return records.map((record: RecordType) => ({
    slug: record.slug,
  }))
}

export async function generateMetadata({ params }: ParamsType): Promise<Metadata> {
  const records = await getAllRecords()
  const record = records.find((record) => record.slug === params.slug)

  return {
    title: `${record.title}`,
    // description: `${record.description}`,
  }
}

const RecordPage = async ({ params }: ParamsType): Promise<JSX.Element> => {
  const records = await getAllRecords()
  const filterRecord = records.filter((record) => record.slug === params.slug)

  if (!filterRecord.length) {
    notFound()
  }

  return (
    <main className="">
      <Breadcrumbs
        items={[
          { label: 'Database', url: '/database' },
          {
            label: `${CATEGORY_OPTIONS_MAP[filterRecord[0].category]}`,
            url: `/database/${filterRecord[0].category}`,
            isCategory: true,
          },
          {
            label: filterRecord[0].title,
            url: `/database/${filterRecord[0].category}/${filterRecord[0].slug}`,
          },
        ]}
      />
      <div className="text-5xl font-semibold mb-6">{filterRecord[0].title}</div>
      <Link href={filterRecord[0].url}>{filterRecord[0].title}</Link>
    </main>
  )
}

export default RecordPage
