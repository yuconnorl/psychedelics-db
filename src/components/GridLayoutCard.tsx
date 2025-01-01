import Image from 'next/image'
import Link from 'next/link'

import { AspectRatio } from './ui/aspect-ratio'

import { getAllRecords } from '@/api/general'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LANGUAGE_MAP } from '@/config/general'
import { IMAGE_PLACEHOLDER } from '@/constants/constants'
import { capitalizeFirstLetter } from '@/lib/utils'
import { InfoCard, RecordType } from '@/types'
import { resolveMetaTag } from '@/utilities/metaTag'

const GridCard = async ({
  category,
  slug,
  title,
  url,
  type,
  language,
  metaDescription,
}: InfoCard): Promise<JSX.Element> => {
  const meta = await resolveMetaTag(url, slug, title)

  return (
    <Link href={`/database/${category}/${slug}`}>
      <Card className='break-inside relative z-10 transition-transform sm:group-hover:-translate-x-2 sm:group-hover:-translate-y-2 lg:group-hover:-translate-x-3 lg:group-hover:-translate-y-3'>
        <CardHeader>
          <CardTitle className='mb-2 leading-normal'>{title}</CardTitle>
          <div className='flex gap-2'>
            <Badge className='w-fit' variant='secondary'>
              {capitalizeFirstLetter(type)}
            </Badge>
            <Badge className='w-fit' variant='secondary'>
              {LANGUAGE_MAP[language]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
          <div className='relative saturate-[0.15] transition-[filter] group-hover:saturate-100'>
            <AspectRatio ratio={21 / 9}>
              <Image
                src={meta.imgUrl}
                fill
                alt='Image'
                placeholder='blur'
                blurDataURL={IMAGE_PLACEHOLDER}
                sizes='(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 20vw'
                className='rounded-md object-cover object-center'
              />
            </AspectRatio>
          </div>
          {metaDescription ? (
            <p className='line-clamp-2 text-base text-muted-foreground transition-colors group-hover:text-foreground'>
              {metaDescription}
            </p>
          ) : (
            <p className='line-clamp-2 text-base text-muted-foreground transition-colors group-hover:text-foreground'>
              {meta.description}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <div className='relative flex items-center gap-1.5 truncate text-muted-foreground'>
            <Image
              src={meta.iconUrl}
              alt={`Icon of ${title}`}
              width={16}
              height={16}
              className='h-4 w-4 object-contain'
            />
            <p className='w-full truncate break-all text-sm'>{url}</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

const GridLayoutCard = async ({
  params,
}: {
  params: { category: string }
}): Promise<JSX.Element> => {
  const records = await getAllRecords()
  const filterRecord: RecordType[] = records.filter(
    (record: RecordType) => record.category === params.category,
  )

  return (
    <>
      {filterRecord.map(
        ({
          id,
          category,
          slug,
          title,
          url,
          type,
          language,
          metaDescription,
        }) => (
          <article key={id} className='group relative mb-2 h-fit sm:mb-4'>
            <GridCard
              category={category}
              slug={slug}
              title={title}
              url={url}
              type={type}
              language={language}
              metaDescription={metaDescription}
            />
            <div className='absolute left-1 top-1 -z-10 h-[calc(100%-5px)] w-[calc(100%-5px)] rounded-lg bg-foreground' />
          </article>
        ),
      )}
    </>
  )
}

export default GridLayoutCard
