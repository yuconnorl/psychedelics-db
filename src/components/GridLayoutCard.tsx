import Image from 'next/image'
import Link from 'next/link'

import { AspectRatio } from './ui/aspect-ratio'

import { getAllRecords } from '@/api/general'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { resolveMetaTag } from '@/utilities/metaTag'

const GridCard = async ({ slug, title, url, type, language }) => {
  const meta = await resolveMetaTag(url, slug)

  return (
    <Card className="relative sm:group-hover:-translate-x-2 sm:group-hover:-translate-y-2 lg:group-hover:-translate-x-3 lg:group-hover:-translate-y-3 transition-transform z-10">
      <CardHeader>
        <CardTitle className="leading-normal mb-2">{title}</CardTitle>
        <div className="flex gap-2">
          <Badge className="w-fit" variant="secondary">
            {type}
          </Badge>
          <Badge className="w-fit" variant="secondary">
            {language}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="saturate-[0.15] group-hover:saturate-100 transition-[filter]">
          <AspectRatio ratio={21 / 9}>
            <Image
              src={meta.imgUrl}
              fill
              alt="Image"
              sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 20vw"
              className="rounded-md object-cover object-center"
            />
          </AspectRatio>
        </div>
        <p className="line-clamp-2 text-muted-foreground text-base group-hover:text-foreground transition-colors">
          {meta.description}
        </p>
      </CardContent>
      <CardFooter>
        <div className="relative flex gap-1.5 items-center text-muted-foreground">
          <Image
            src={meta.iconUrl}
            alt={`Icon of ${title}`}
            width={20}
            height={20}
            className="object-contain"
          />
          <Link className="text-sm break-all" href={url}>
            {url}
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

const GridLayoutCard = async ({ params }) => {
  const records = await getAllRecords()
  const filterRecord = records.filter((record) => record.category === params.category)

  return (
    <>
      {filterRecord.map(({ slug, title, url, type, language }) => (
        <div className="relative group h-fit">
          <GridCard slug={slug} title={title} url={url} type={type} language={language} />
          <div className="absolute bg-foreground w-[calc(100%-5px)] h-[calc(100%-5px)] top-1 left-1 rounded-lg -z-10"></div>
        </div>
      ))}
    </>
  )
}

export default GridLayoutCard
