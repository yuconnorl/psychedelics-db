import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAllRecords } from '@/api/general'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ChevronRightUpIcon } from '@/components/Icons'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LANGUAGE_MAP } from '@/config/general'
import { CATEGORY_OPTIONS_MAP } from '@/config/options'
import { capitalizeFirstLetter } from '@/lib/utils'
import { RecordType } from '@/types'
import { resolveMetaTag } from '@/utilities/metaTag'

type ParamsType = {
  params: {
    slug: string
  }
}

export async function generateStaticParams(): Promise<
  Record<'slug', string>[]
> {
  const records = await getAllRecords()

  return records.map((record: RecordType) => ({
    slug: record.slug,
  }))
}

export async function generateMetadata({
  params,
}: ParamsType): Promise<Metadata> {
  const records = await getAllRecords()
  const record = records.find((record) => record.slug === params.slug)

  return {
    title: `${record.title}`,
    // description: `${record.description}`,
  }
}

const RecordPage = async ({ params }: ParamsType): Promise<JSX.Element> => {
  const records = await getAllRecords()
  const filterRecord = records.find((record) => record.slug === params.slug)

  if (!filterRecord) {
    notFound()
  }

  const { category, slug, title, url, language, type } = filterRecord
  const meta = await resolveMetaTag(url, slug)

  console.log(filterRecord)

  return (
    <article>
      <Breadcrumbs
        items={[
          { label: 'Database', url: '/database' },
          {
            label: `${CATEGORY_OPTIONS_MAP[category]}`,
            url: `/database/${category}`,
            isCategory: true,
          },
          {
            label: title,
            url: `/database/${category}/${slug}`,
          },
        ]}
      />
      <div>
        <h2 className='text-3xl sm:text-4xl xl:text-5xl font-semibold mb-2 leading-tight md:mb-4'>
          {title}
        </h2>
        <div className='flex gap-2 my-4'>
          <Badge className='w-fit' variant='secondary'>
            {capitalizeFirstLetter(type)}
          </Badge>
          <Badge className='w-fit' variant='secondary'>
            {LANGUAGE_MAP[language]}
          </Badge>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <AspectRatio
          className='my-2 border-muted-foreground/20 border rounded-lg'
          ratio={21 / 9}
        >
          <Image
            src={meta.imgUrl}
            fill
            alt='Image'
            sizes='(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 100vw'
            className='rounded-md object-cover object-center'
          />
        </AspectRatio>
        <div className='px-4   leading-relaxed'>{meta.description}</div>
        <Button className='md:w-52 mt-28' asChild variant='secondary'>
          <Link href={url} className='flex gap-2'>
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
