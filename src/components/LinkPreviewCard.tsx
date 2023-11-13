import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const LinkPreviewCard = ({ href, title, imgUrl, description }) => {
  return (
    <Link href={href}>
      <Card className=" w-2/3">
        <CardHeader>
          <CardTitle className="leading-relaxed">{title}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          {/* <AspectRatio ratio={16 / 9}>
          <Image src={imgUrl} alt="Image" fill={true} className="rounded-md object-cover" />
        </AspectRatio> */}
          <div className="">
            <p className="truncate">{description}</p>
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
