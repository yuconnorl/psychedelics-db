import Image from 'next/image'
import Link from 'next/link'

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
import { CardParamsProps, InfoCard, RecordType } from '@/types'
import { resolveMetaTag } from '@/utilities/metaTag'

const StackCard = async ({
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
      <Card className='relative z-10 grid grid-rows-[minmax(0,1fr)_200px] overflow-hidden transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 sm:grid-cols-[minmax(0,1fr)_240px] sm:grid-rows-none lg:group-hover:-translate-x-3 lg:group-hover:-translate-y-3 xl:grid-cols-[minmax(0,1fr)_320px]'>
        <div>
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
          <CardContent className='gap-2'>
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
              <p className='truncate break-all text-sm'>{url}</p>
            </div>
          </CardFooter>
        </div>
        <div className='saturate-[0.15] transition-[filter] group-hover:saturate-100'>
          <Image
            src={meta.imgUrl}
            alt={`OG Image of ${url}`}
            fill
            placeholder='blur'
            blurDataURL={IMAGE_PLACEHOLDER}
            className='object-cover object-center'
          />
        </div>
      </Card>
    </Link>
  )
}

const StackLayoutCard = async ({
  params,
}: CardParamsProps): Promise<JSX.Element> => {
  const records = await getAllRecords()
  const filterRecord: RecordType[] = records.filter(
    (record: RecordType) => record.category === params.category,
  )

  return (
    <>
      {filterRecord.map(
        ({
          category,
          slug,
          title,
          url,
          id,
          type,
          language,
          metaDescription,
        }) => (
          <div key={id} className='group relative h-fit'>
            <StackCard
              category={category}
              slug={slug}
              title={title}
              url={url}
              type={type}
              language={language}
              metaDescription={metaDescription}
            />
            <div className='absolute left-1 top-1 -z-10 h-[calc(100%-5px)] w-[calc(100%-5px)] rounded-lg bg-foreground' />
          </div>
        ),
      )}
    </>
  )
}

export default StackLayoutCard
