import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAllRecords } from '@/api/general'
import Breadcrumbs from '@/components/Breadcrumbs'
import { CATEGORY_OPTIONS_MAP } from '@/config/options'

// export async function generateStaticParams() {
//   const records = await getAllRecords()

//   return records.map(record => ({
//     slug: record.category,
//   }))
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   return {
//     title: `Category: ${params.category}`,
//     description: `All Posts of ${params.category}`,
//   }
// }

const RecordPage = async ({ params }) => {
  const records = await getAllRecords()
  const filterRecord = records.filter(record => record.slug === params.slug)

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
