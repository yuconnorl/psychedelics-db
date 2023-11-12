import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAllRecords } from '@/api/general'

export async function generateStaticParams() {
  const records = await getAllRecords()

  return records.map(record => ({
    category: record.category,
  }))
}

const CategoryPage = async ({ params }) => {
  const records = await getAllRecords()
  const filterRecord = records.filter(record => record.category === params.category)

  if (!filterRecord.length) {
    notFound()
  }

  return (
    <div className="">
      <div className="text-5xl font-semibold mb-6">{params.category}</div>
      <div className="flex flex-col gap-3">
        {filterRecord.map(record => (
          <div key={record.id}>
            <Link href={`/database/${params.category}/${record.slug}`}>{record.title}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryPage
