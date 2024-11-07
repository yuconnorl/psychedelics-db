import Link from 'next/link'

import FadingMaskBottom from '@/components/FadingMaskBottom'
import FadingMaskTop from '@/components/FadingMaskTop'
import { ChartBarSquareIcon, InfoIcon, TheEye } from '@/components/Icons'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { substanceOptions } from '@/config/options'

const LoadingSkeleton = () => {
  return (
    <div className='px-2 sm:px-3 py-5 rounded-sm bg-muted-foreground/5'>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[84%]' />
        <Skeleton className='h-4 w-[73%]' />
      </div>
    </div>
  )
}

const VectorSearchResult = ({ searchResults, isLoading = false }) => {
  return (
    <div className='mt-6 md:mt-10'>
      <div className='text-sm'>
        <span className='text-primary/90'>Search Results </span>
        <span className='text-primary/70'>
          (By correlation, highest to lowest)
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='inline-flex'>
                <InfoIcon />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>The results comprise the top five correlations</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <article className='max-h-[45dvh] overflow-y-scroll relative'>
        {isLoading || searchResults?.length > 0 ? <FadingMaskTop /> : null}
        <div className='overflow-y-scroll h-full flex flex-col space-y-2.5'>
          {!isLoading && searchResults?.length === 0 && (
            <div className='text-primary/70 text-sm flex items-center'>
              <span>No results</span>
              <TheEye className='w-6 h-6 mx-1.5' />
              <span>Trying to search.</span>
            </div>
          )}
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
              className='text-sm flex flex-col sm:items-center sm:grid sm:grid-cols-[minmax(3.75rem,_1fr)_8fr] px-2 sm:px-3 py-3 rounded-sm bg-muted-foreground/5 hover:bg-muted-foreground/30 transition-colors'
            >
              <div className='flex gap-1 flex-col mb-2 pl-1'>
                <div className='flex items-end text-primary/60'>
                  <ChartBarSquareIcon className='mr-0.5' />
                  <span className='text-xs'>{result.score.toFixed(3)}</span>
                </div>
              </div>
              <div>
                <div className='pl-1 pr-3'>{result.payload.title}</div>
                <div className='mt-1.5 gap-x-1 flex'>
                  {result.payload.substance.map((sub) => (
                    <Badge
                      className=' text-[10px] px-2 py-0 text-primary/60'
                      key={sub}
                      variant='secondary'
                    >
                      {substanceOptions[sub]}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {isLoading || searchResults?.length > 0 ? <FadingMaskBottom /> : null}
      </article>
    </div>
  )
}

export default VectorSearchResult
