import Image from 'next/image'
import Link from 'next/link'

import { getAllRecords } from '@/api/general'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { resolveMetaTag } from '@/utilities/metaTag'

const StackCard = async ({ slug, title, url, type, language }) => {
  const meta = await resolveMetaTag(url, slug)

  return (
    <Card className="relative overflow-hidden grid grid-cols-[minmax(0,1fr)_300px] md:grid-cols-[minmax(0,1fr)_200px] xl:grid-cols-[minmax(0,1fr)_320px] sm:group-hover:-translate-x-2 sm:group-hover:-translate-y-2 lg:group-hover:-translate-x-3 lg:group-hover:-translate-y-3 transition-transform z-10">
      <div>
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
        <CardContent className="gap-2">
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
      </div>
      <div className="saturate-[0.15] group-hover:saturate-100 transition-[filter]">
        <Image
          src={meta.imgUrl}
          alt={`OG Image of ${url}`}
          fill
          className="object-cover object-center"
        />
      </div>
    </Card>
  )
}

const StackLayoutCard = async ({ params }) => {
  const records = await getAllRecords()
  const filterRecord = records.filter((record) => record.category === params.category)

  return (
    <>
      {filterRecord.map(({ slug, title, url, id, type, language }) => (
        <div key={id} className="h-fit">
          <div className="relative group">
            <StackCard slug={slug} title={title} url={url} type={type} language={language} />
            <div className="absolute bg-foreground w-[calc(100%-5px)] h-[calc(100%-5px)] top-1 left-1 rounded-lg -z-10"></div>
          </div>
        </div>
      ))}
    </>
  )
}

export default StackLayoutCard
