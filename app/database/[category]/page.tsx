import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAllRecords } from '@/api/general'
import LinkPreviewCard from '@/components/LinkPreviewCard'
import { CATEGORY_OPTIONS_MAP } from '@/config/options'
import { resolveMetaTag } from '@/utilities/metaTag'

export async function generateStaticParams() {
  const records = await getAllRecords()

  return records.map(record => ({
    category: record.category,
  }))
}

const Seg = async ({ category, slug, title, url, id }) => {
  const meta = await resolveMetaTag(url)

  return (
    <div key={id} className="py-6">
      <div className="text-xl mb-3 pl-1">
        <Link href={`/database/${category}/${slug}`}>{title}</Link>
      </div>
      <LinkPreviewCard
        href={meta.href}
        title={meta.title}
        imgUrl={meta.imgUrl}
        description={meta.description}
        iconUrl={meta.iconUrl}
      />
    </div>
  )
}

const CategoryPage = async ({ params }) => {
  const records = await getAllRecords()
  const filterRecord = records.filter(record => record.category === params.category)

  if (!filterRecord.length) {
    notFound()
  }

  return (
    <div className="">
      <div className="text-5xl font-semibold mb-6">{CATEGORY_OPTIONS_MAP[params.category]}</div>
      <div className="flex flex-col gap-4">
        {filterRecord.map(({ category, slug, title, url, id }) => (
          // <div key={record.id}>
          //   <Link href={`/database/${params.category}/${record.slug}`}>{record.title}</Link>
          // </div>

          <Seg key={id} category={category} slug={slug} title={title} url={url} id={id} />
        ))}
      </div>
    </div>
  )
}

export default CategoryPage
