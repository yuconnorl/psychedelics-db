import { getAllRecords } from '@/api/general'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

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
      <div className="text-5xl font-semibold mb-6">{filterRecord[0].title}</div>
      <div>Link</div>
      <Link href={filterRecord[0].url}>{filterRecord[0].title}</Link>
    </main>
  )
}

export default RecordPage
