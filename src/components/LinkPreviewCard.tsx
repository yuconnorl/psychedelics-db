import Image from 'next/image'
import Link from 'next/link'

import { AspectRatio } from './ui/aspect-ratio'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const LinkPreviewCard = ({ href, title, imgUrl, description, iconUrl, recordType }) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="leading-relaxed">{title}</CardTitle>
        <Badge className="w-fit">{recordType}</Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <AspectRatio ratio={21 / 9}>
          <Image
            src={imgUrl}
            alt="Image"
            fill={true}
            className="rounded-md object-cover object-center"
          />
        </AspectRatio>
        <p className="line-clamp-2 text-lg">{description}</p>
      </CardContent>
      <CardFooter>
        <div className="relative flex gap-1.5 items-center text-muted-foreground">
          <Image src={iconUrl} alt="Image" width={20} height={20} className="object-contain" />
          <Link href={href}>{href}</Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export default LinkPreviewCard
