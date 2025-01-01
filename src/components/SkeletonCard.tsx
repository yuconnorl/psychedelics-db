import { AspectRatio } from './ui/aspect-ratio'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type SkeletonCardProps = {
  isGrid: boolean
  cardNumber?: number
}

const GridSkeletonCard = (): JSX.Element => {
  return (
    <Card className='break-inside relative z-10 mb-4'>
      <CardHeader>
        <div className='flex flex-col gap-4'>
          <Skeleton className='h-5 w-[230px] rounded-full' />
          <Skeleton className='h-5 w-[150px] rounded-full' />
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <div className='relative saturate-[0.15] transition-[filter]'>
          <AspectRatio ratio={21 / 9}>
            <Skeleton className='h-full w-full rounded-md' />
          </AspectRatio>
        </div>
        <Skeleton className='h-5 w-[250px] rounded-full' />
      </CardContent>
      <CardFooter>
        <div className='relative flex items-center gap-1.5 text-muted-foreground'>
          <Skeleton className='h-6 w-6 rounded-full' />
          <Skeleton className='h-5 w-[100px] rounded-full' />
        </div>
      </CardFooter>
    </Card>
  )
}

const StackSkeletonCard = (): JSX.Element => {
  return (
    <Card className='relative z-10 grid grid-rows-[minmax(0,1fr)_200px] overflow-hidden sm:grid-cols-[minmax(0,1fr)_240px] sm:grid-rows-none xl:grid-cols-[minmax(0,1fr)_320px]'>
      <div>
        <CardHeader>
          <div className='flex flex-col gap-4'>
            <Skeleton className='h-5 w-[230px] rounded-full' />
            <Skeleton className='h-5 w-[150px] rounded-full' />
          </div>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <div className='relative'></div>
          <Skeleton className='h-5 w-[250px] rounded-full' />
        </CardContent>
        <CardFooter>
          <div className='relative flex items-center gap-1.5 text-muted-foreground'>
            <Skeleton className='h-6 w-6 rounded-full' />
            <Skeleton className='h-5 w-[100px] rounded-full' />
          </div>
        </CardFooter>
      </div>
      <div className=''>
        <Skeleton className='h-full w-full rounded-md' />
      </div>
    </Card>
  )
}

const SkeletonCard = ({
  isGrid,
  cardNumber = 8,
}: SkeletonCardProps): JSX.Element => {
  const fakeCardArr = Array(cardNumber).fill('')

  return (
    <>
      <div
        className={cn(
          isGrid ? 'columns-xs xl:columns-sm' : 'flex flex-col gap-4',
        )}
      >
        {fakeCardArr.map((_, index) =>
          isGrid ? (
            <GridSkeletonCard key={index} />
          ) : (
            <StackSkeletonCard key={index} />
          ),
        )}
      </div>
    </>
  )
}

export default SkeletonCard
