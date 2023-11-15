import { Suspense } from 'react'
import clsx from 'clsx'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAllRecords } from '@/api/general'
import Breadcrumbs from '@/components/Breadcrumbs'
import CardContainer from '@/components/CardContainer'
import Grid from '@/components/GridLayoutCard'
import LinkPreviewCard from '@/components/LinkPreviewCard'
import PreviewCard from '@/components/PreviewCard'
import Stack from '@/components/StackLayoutCard'
import { badgeVariants } from '@/components/ui/badge'
import { CATEGORY_OPTIONS_MAP } from '@/config/options'
import { resolveMetaTag } from '@/utilities/metaTag'

export async function generateStaticParams() {
  const records = await getAllRecords()

  return records.map((record) => ({
    category: record.category,
  }))
}

const Seg = async ({ category, slug, title, url, recordType, language }) => {
  const meta = await resolveMetaTag(url, slug)

  return (
    <div className="py-3 h-fit">
      <LinkPreviewCard
        href={meta.href}
        title={meta.title}
        imgUrl={meta.imgUrl}
        description={meta.description}
        iconUrl={meta.iconUrl}
        recordType={recordType}
        language={language}
      />
      <Link
        href={`/database/${category}/${slug}`}
        className={clsx(
          badgeVariants({ variant: 'secondary' }),
          'mt-2 hover:opacity-60 transition-opacity rounded-sm',
        )}
      >
        {title}
      </Link>
    </div>
  )
}

const CategoryPage = async ({ params }) => {
  const records = await getAllRecords()
  const filterRecord = records.filter((record) => record.category === params.category)

  if (!filterRecord.length) {
    notFound()
  }

  return (
    <div className="">
      <Breadcrumbs
        items={[
          { label: 'Database', url: '/database' },
          {
            label: `${CATEGORY_OPTIONS_MAP[params.category]}`,
            url: `/database/${params.category}`,
          },
        ]}
      />
      <h2 className="text-5xl font-semibold mb-6">{CATEGORY_OPTIONS_MAP[params.category]}</h2>
      {/* <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4"> */}
      <div className="flex flex-col gap-4">
        {/* {filterRecord.map(({ category, slug, title, url, id, type, language }) => (
          <PreviewCard
            key={id}
            language={language}
            category={category}
            slug={slug}
            title={title}
            url={url}
            recordType={type}
          />
        ))} */}
        <Suspense fallback={<div>Loading...</div>}>
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
