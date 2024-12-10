import Link from 'next/link'

import FadingMaskBottom from '@/components/FadingMaskBottom'
import { ChartBarSquareIcon, InfoIcon, TheEye } from '@/components/Icons'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { substanceOptions } from '@/config/options'

const LoadingSkeleton = () => {
  return (
    <div className='px-2 sm:px-3 py-5 rounded-sm bg-muted-foreground/5'>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[18%]' />
        <Skeleton className='h-4 w-[84%]' />
        <Skeleton className='h-4 w-[73%]' />
      </div>
    </div>
  )
}

const VectorSearchResult = ({ search, searchResults, isLoading = false }) => {
  return (
    <div>
      <article className='max-h-[50dvh] min-h-30 overflow-y-scroll relative'>
        {/* {searchResults?.length > 0 ? <FadingMaskTop /> : null} */}
        <div className='overflow-y-scroll h-full flex flex-col space-y-2.5'>
          {
            <>
              {isLoading && (
                <>
                  {Array.from({ length: 3 }, (_, index) => (
                    <LoadingSkeleton key={index} />
                  ))}
                </>
              )}
            </>
          }
          {searchResults?.map((result) => (
            <Link
              href={`/research/${result.payload.slug}`}
              prefetch={false}
              key={result.id}
              className='text-sm flex flex-col px-2 sm:px-3 py-3.5 rounded-sm bg-muted-foreground/5 hover:bg-muted-foreground/30 transition-colors'
            >
              <div className='mb-2 gap-x-1 flex pl-0.5'>
                {result.payload.substance.map((sub) => (
                  <Badge
                    className='text-[10px] px-2 py-0 text-primary/80 border-primary/30'
                    key={sub}
                    variant='outline'
                  >
                    {substanceOptions[sub]}
                  </Badge>
                ))}
              </div>
              <div className='pl-0.5'>
                <div className='pl-1 pr-3 text-primary/85'>
                  {result.payload.title}
                </div>
                <div className='flex gap-1 flex-col mt-2 pl-1'>
                  <div className='flex items-end text-primary/60'>
                    <ChartBarSquareIcon className='mr-1' />
                    <span className='text-xs'>{result.score.toFixed(3)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {searchResults?.length > 0 ? <FadingMaskBottom /> : null}
      </article>
    </div>
  )
}

export default VectorSearchResult
