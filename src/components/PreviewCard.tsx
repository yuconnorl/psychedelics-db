import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import { AspectRatio } from './ui/aspect-ratio'

import { Badge, badgeVariants } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const PreviewCard = ({
  category,
  href,
  title,
  imgUrl,
  description,
  iconUrl,
  recordType,
  language,
}) => {
  return (
    <div className="h-fit">
      <div className="relative group">
        <Card className="relative overflow-hidden grid grid-cols-[minmax(0,1fr)_320px] sm:group-hover:-translate-x-2 sm:group-hover:-translate-y-2 lg:group-hover:-translate-x-3 lg:group-hover:-translate-y-3 transition-transform z-10">
          <div>
            <CardHeader>
              <CardTitle className="leading-normal mb-2">{title}</CardTitle>
              <div className="flex gap-2">
                <Badge className="w-fit" variant="secondary">
                  {recordType}
                </Badge>
                <Badge className="w-fit" variant="secondary">
                  {language}
                </Badge>
              </div>
              <div>Description goes here</div>
              <div className="">Links goes here</div>
            </CardHeader>
            <CardContent className="flex gap-2">
              <div className="saturate-[0.15] group-hover:saturate-100 transition-[filter]">
                <AspectRatio ratio={21 / 9}>
                  <Image
                    src={imgUrl}
                    fill
                    alt="Image"
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 20vw"
                    className="rounded-md object-cover object-center"
                  />
                </AspectRatio>
              </div>
            </CardContent>
          </div>
          <div className="relative">
            <Image
              src={
                'https://psychedelicalpha.com/wp-content/uploads/2023/10/Psychedelic-Alpha-Home.png'
              }
              alt="Image"
              fill
              className="object-cover  object-center"
            />
          </div>
        </Card>
        <div className="absolute bg-foreground w-[calc(100%-5px)] h-[calc(100%-5px)] top-1 left-1 rounded-lg -z-10"></div>
      </div>
      {/* <Link
        href={`/database/${category}/${slug}`}
        className={clsx(
          badgeVariants({ variant: 'secondary' }),
          'mt-2 hover:opacity-60 transition-opacity rounded-sm',
        )}
      >
        {title}
      </Link> */}
    </div>
  )
}

export default PreviewCard
