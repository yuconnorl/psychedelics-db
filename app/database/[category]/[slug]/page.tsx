import { Suspense } from 'react'
import { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAllRecords, getCategories } from '@/api/general'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ChevronRightUpIcon } from '@/components/Icons'
import SerializeSlate from '@/components/SerializeSlate'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { LANGUAGE_MAP } from '@/config/general'
import { IMAGE_PLACEHOLDER } from '@/constants/constants'
import { capitalizeFirstLetter } from '@/lib/utils'
import { RecordType } from '@/types'
import { resolveMetaTag } from '@/utilities/metaTag'

type ParamsType = {
  params: {
    slug: string
    category: string
  }
}

export async function generateStaticParams(): Promise<
  Record<'slug', string>[]
> {
  const records = await getAllRecords()

  return records.map((record: RecordType) => ({
    slug: record.slug,
    category: record.category,
  }))
}

export async function generateMetadata(
  { params }: ParamsType,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const records = await getAllRecords()
  const record = records.find((record) => record.slug === params.slug)

  const parentData = (await parent) as unknown as Metadata
  const parentOpenGraph = parentData.openGraph
  const parentTwitter = parentData.twitter

  return {
    title: record.title,
    openGraph: {
      title: record.title,
      images: parentOpenGraph.images,
    },
    twitter: {
      card: 'summary_large_image',
      title: record.title,
      images: parentTwitter.images,
    },
  }
}

const RecordPage = async ({ params }: ParamsType): Promise<JSX.Element> => {
  const records = await getAllRecords()
  const categories = await getCategories()

  const currentCategory = categories.find(
    (category) => category.value === params.category,
  )
  const filterRecord = records.find((record) => record.slug === params.slug)

  if (!filterRecord) {
    notFound()
  }

  const {
    category,
    slug,
    title,
    url,
    language,
    type,
    metaDescription,
    richText,
  } = filterRecord

  const meta = await resolveMetaTag(url, slug, title)

  return (
    <article>
      <Suspense fallback={<div>Breadcrumbs</div>}>
        <Breadcrumbs
          items={[
            { label: 'Database', url: '/database' },
            {
              label: `${currentCategory.displayName}`,
              url: `/database/${category}`,
              isCategory: true,
            },
            {
              label: title,
              url: `/database/${category}/${slug}`,
            },
          ]}
        />
      </Suspense>
      <div>
        <h2 className='text-3xl sm:text-4xl xl:text-5xl font-semibold mb-2 leading-tight sm:leading-tight xl:leading-tight md:mb-4'>
          {title}
        </h2>
        <section className='flex gap-2 my-4'>
          <Badge className='w-fit' variant='secondary'>
            {capitalizeFirstLetter(type)}
          </Badge>
          <Badge className='w-fit' variant='secondary'>
            {LANGUAGE_MAP[language]}
          </Badge>
        </section>
      </div>
      <div className='flex flex-col gap-2'>
        <AspectRatio
          className='my-2 border-muted-foreground/10 border rounded-lg'
          ratio={21 / 9}
        >
          <Image
            src={meta.imgUrl}
            fill
            blurDataURL={IMAGE_PLACEHOLDER}
            priority
            placeholder='blur'
            alt={`OG Image of ${title}`}
            sizes='(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 100vw'
            className='rounded-md object-cover object-center w-auto h-auto'
          />
        </AspectRatio>
        <div className='px-2 md:px-3 leading-relaxed text-primary/70'>
          {metaDescription ? (
            <span>{metaDescription}</span>
          ) : (
            <span>{meta.description}</span>
          )}
        </div>
        {richText && (
          <>
            <Separator className=' mt-2 mb-4 md:mt-5 md:mb-7' />
            <div className='px-2 md:px-3'>
              <SerializeSlate value={richText} />
            </div>
          </>
        )}
        <Button
          className='mt-12 md:w-52 md:mt-16 h-11'
          asChild
          variant='secondary'
        >
          <Link href={url} className='flex gap-2' target='_blank'>
            <span className='mr-1'>Visit resource</span>
            <Image
              src={meta.iconUrl}
              alt={`Icon of ${title}`}
              width={20}
              height={20}
              className='object-contain'
            />
            <ChevronRightUpIcon />
          </Link>
        </Button>
      </div>
    </article>
  )
}

export default RecordPage
