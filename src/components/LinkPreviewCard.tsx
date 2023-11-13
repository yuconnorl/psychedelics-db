import Image from 'next/image'
import Link from 'next/link'

import { AspectRatio } from './ui/aspect-ratio'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const LinkPreviewCard = ({ href, title, imgUrl, description, iconUrl }) => {
  return (
    <Link href={href}>
      <Card className=" w-2/3">
        <CardHeader>
          <CardTitle className="leading-relaxed">{title}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <AspectRatio ratio={21 / 9}>
            <Image
              src={imgUrl}
              alt="Image"
              fill={true}
              className="rounded-md object-cover object-center"
            />
          </AspectRatio>
          <div className="">
            <p className="truncate">{description}</p>
          </div>
          <div className="relative flex gap-1.5 items-center">
            <Image src={iconUrl} alt="Image" width={20} height={20} className="object-contain" />
            {href}
          </div>
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    </Link>
  )
}

export default LinkPreviewCard
