import Link from 'next/link'

import FadingMaskBottom from '@/components/FadingMaskBottom'
import { ChartBarSquareIcon } from '@/components/Icons'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { substanceOptions } from '@/config/options'

const LoadingSkeleton = () => {
  return (
    <div className='min-w-32 overflow-hidden rounded-sm bg-muted-foreground/5 px-2 py-5 sm:px-3'>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[18%]' />
        <Skeleton className='h-4 w-[84%]' />
        <Skeleton className='h-4 w-[73%]' />
      </div>
    </div>
  )
}

const VectorSearchResult = ({ searchResults, isLoading = false }) => {
  return (
    <>
      <article className='md:min-h-30 relative overflow-y-scroll md:max-h-[50dvh]'>
        <div className='flex h-full gap-2 overflow-y-scroll md:flex-col md:gap-2.5'>
          {
            <>
              {isLoading ? (
                <>
                  {Array.from({ length: 5 }, (_, index) => (
                    <LoadingSkeleton key={index} />
                  ))}
                </>
              ) : (
                searchResults?.map((result) => (
                  <Link
                    href={`/research/${result.payload.slug}`}
                    prefetch={false}
                    key={result.id}
                    className='flex max-w-[12.5rem] flex-[1_0_13rem] flex-col rounded-sm bg-muted-foreground/5 px-2 py-3.5 text-xs transition-colors hover:bg-muted-foreground/30 sm:px-3 md:max-w-full md:flex-[1_0_0] md:text-sm'
                  >
                    <div className='mb-2 flex gap-x-1 pl-0.5'>
                      {result.payload.substance.map((sub) => (
                        <Badge
                          className='border-primary/30 px-2 py-0 text-[10px] text-primary/80'
                          key={sub}
                          variant='outline'
                        >
                          {substanceOptions[sub]}
                        </Badge>
                      ))}
                    </div>
                    <div className='pl-0.5'>
                      <div className='line-clamp-3 w-full text-ellipsis px-1 pl-1 text-primary/85 md:pr-3'>
                        {result.payload.title}
                      </div>
                      <div className='mt-2 flex flex-col gap-1 pl-1'>
                        <div className='flex items-end text-primary/60'>
                          <ChartBarSquareIcon className='mr-1' />
                          <span className='text-xs'>
                            {result.score.toFixed(3)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </>
          }
        </div>
        {searchResults?.length > 0 ? <FadingMaskBottom /> : null}
      </article>
    </>
  )
}

export default VectorSearchResult
