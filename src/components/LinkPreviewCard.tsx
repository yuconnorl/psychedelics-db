import Image from 'next/image'
import Link from 'next/link'

import { AspectRatio } from './ui/aspect-ratio'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const LinkPreviewCard = ({ href, title, imgUrl, description, iconUrl, recordType }) => {
  return (
    <div className="relative group">
      <Card className="relative sm:group-hover:-translate-x-2 sm:group-hover:-translate-y-2 lg:group-hover:-translate-x-3 lg:group-hover:-translate-y-3 transition-transform z-10">
        <CardHeader>
          <CardTitle className="leading-relaxed">{title}</CardTitle>
          <Badge className="w-fit">{recordType}</Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
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

          <p className="line-clamp-2 text-lg">{description}</p>
        </CardContent>
        <CardFooter>
          <div className="relative flex gap-1.5 items-center text-muted-foreground">
            <Image src={iconUrl} alt="Image" width={20} height={20} className="object-contain" />
            <Link href={href}>{href}</Link>
          </div>
        </CardFooter>
      </Card>
      <div className="absolute bg-foreground w-[calc(100%-5px)] h-[calc(100%-5px)] top-1 left-1 rounded-lg -z-10"></div>
    </div>
  )
}

export default LinkPreviewCard
