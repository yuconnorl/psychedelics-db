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
}: InfoCard) => {
  const meta = await resolveMetaTag(url, slug, title)

  return (
    <Link href={`/database/${category}/${slug}`}>
      <Card className='relative break-inside sm:group-hover:-translate-x-2 sm:group-hover:-translate-y-2 lg:group-hover:-translate-x-3 lg:group-hover:-translate-y-3 transition-transform z-10'>
        <CardHeader>
          <CardTitle className='leading-normal mb-2'>{title}</CardTitle>
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
          <div className='relative saturate-[0.15] group-hover:saturate-100 transition-[filter]'>
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
          <p className='line-clamp-2 text-muted-foreground text-base group-hover:text-foreground transition-colors'>
            {meta.description}
          </p>
        </CardContent>
        <CardFooter>
          <div className='relative flex gap-1.5 items-center text-muted-foreground'>
            <Image
              src={meta.iconUrl}
              alt={`Icon of ${title}`}
              width={20}
              height={20}
              className='object-contain'
            />
            <p className='text-sm break-all'>{url}</p>
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
        ({ id, category, slug, title, url, type, language }) => (
          <article key={id} className='relative group h-fit mb-2 sm:mb-4'>
            <GridCard
              category={category}
              slug={slug}
              title={title}
              url={url}
              type={type}
              language={language}
            />
            <div className='absolute bg-foreground w-[calc(100%-5px)] h-[calc(100%-5px)] top-1 left-1 rounded-lg -z-10' />
          </article>
        ),
      )}
    </>
  )
}

export default GridLayoutCard
