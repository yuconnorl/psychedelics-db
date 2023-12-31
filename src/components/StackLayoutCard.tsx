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
      <Card className='relative overflow-hidden grid grid-rows-[minmax(0,1fr)_200px] sm:grid-rows-none sm:grid-cols-[minmax(0,1fr)_240px] xl:grid-cols-[minmax(0,1fr)_320px] group-hover:-translate-x-2 group-hover:-translate-y-2 lg:group-hover:-translate-x-3 lg:group-hover:-translate-y-3 transition-transform z-10'>
        <div>
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
          <CardContent className='gap-2'>
            {metaDescription ? (
              <p className='line-clamp-2 text-muted-foreground text-base group-hover:text-foreground transition-colors'>
                {metaDescription}
              </p>
            ) : (
              <p className='line-clamp-2 text-muted-foreground text-base group-hover:text-foreground transition-colors'>
                {meta.description}
              </p>
            )}
          </CardContent>
          <CardFooter>
            <div className='relative flex gap-1.5 items-center text-muted-foreground truncate'>
              <Image
                src={meta.iconUrl}
                alt={`Icon of ${title}`}
                width={16}
                height={16}
                className='object-contain w-4 h-4'
              />
              <p className='text-sm break-all truncate'>{url}</p>
            </div>
          </CardFooter>
        </div>
        <div className='saturate-[0.15] group-hover:saturate-100 transition-[filter]'>
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
          <div key={id} className='h-fit relative group'>
            <StackCard
              category={category}
              slug={slug}
              title={title}
              url={url}
              type={type}
              language={language}
              metaDescription={metaDescription}
            />
            <div className='absolute bg-foreground w-[calc(100%-5px)] h-[calc(100%-5px)] top-1 left-1 rounded-lg -z-10' />
          </div>
        ),
      )}
    </>
  )
}

export default StackLayoutCard
