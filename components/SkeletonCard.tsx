import clsx from 'clsx'

import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card'
import { Skeleton } from '@components/ui/skeleton'
import { AspectRatio } from './ui/aspect-ratio'

type SkeletonCardProps = {
  isGrid: boolean
  cardNumber?: number
}

const GridSkeletonCard = () => {
  return (
    <Card className='relative break-inside mb-4 z-10'>
      <CardHeader>
        <div className='flex gap-4 flex-col'>
          <Skeleton className='w-[230px] h-5 rounded-full' />
          <Skeleton className='w-[150px] h-5 rounded-full' />
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <div className='relative saturate-[0.15] transition-[filter]'>
          <AspectRatio ratio={21 / 9}>
            <Skeleton className='w-full h-full rounded-md' />
          </AspectRatio>
        </div>
        <Skeleton className='w-[250px] h-5 rounded-full' />
      </CardContent>
      <CardFooter>
        <div className='relative flex gap-1.5 items-center text-muted-foreground'>
          <Skeleton className='h-6 w-6 rounded-full' />
          <Skeleton className='w-[100px] h-5 rounded-full' />
        </div>
      </CardFooter>
    </Card>
  )
}

const StackSkeletonCard = () => {
  return (
    <Card className='relative overflow-hidden grid grid-rows-[minmax(0,1fr)_200px] sm:grid-rows-none sm:grid-cols-[minmax(0,1fr)_240px] xl:grid-cols-[minmax(0,1fr)_320px] z-10'>
      <div>
        <CardHeader>
          <div className='flex gap-4 flex-col'>
            <Skeleton className='w-[230px] h-5 rounded-full' />
            <Skeleton className='w-[150px] h-5 rounded-full' />
          </div>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <div className='relative'></div>
          <Skeleton className='w-[250px] h-5 rounded-full' />
        </CardContent>
        <CardFooter>
          <div className='relative flex gap-1.5 items-center text-muted-foreground'>
            <Skeleton className='h-6 w-6 rounded-full' />
            <Skeleton className='w-[100px] h-5 rounded-full' />
          </div>
        </CardFooter>
      </div>
      <div className=''>
        <Skeleton className='w-full h-full rounded-md' />
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
        className={clsx(
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
