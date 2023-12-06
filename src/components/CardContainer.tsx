'use client'
import { Suspense } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

import { SquaresIcon, StacksIcon } from './Icons'
import TooltipButton from './TooltipButton'

import SkeletonCard from '@/components/SkeletonCard'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ChildrenProps } from '@/types'

const CardContainer = ({ children }: ChildrenProps): JSX.Element => {
  const router = useRouter()

  const layoutMap = {
    grid: children[0],
    stack: children[1],
  }
  const isGrid = true
  return (
    <>
      {/* <div className='hidden sm:flex gap-2 mb-4'>
        <TooltipProvider>
          <TooltipButton content={'Grid Layout'}>
            <Button
              className='ml-auto'
              variant={!isGrid ? 'outline' : 'default'}
              size='icon'
              onClick={() => router.push(`?layout=grid`)}
            >
              <SquaresIcon />
            </Button>
          </TooltipButton>
          <TooltipButton content={'Stack Layout'}>
            <Button
              variant={isGrid ? 'outline' : 'default'}
              size='icon'
              onClick={() => router.push(`?layout=stack`)}
            >
              <StacksIcon />
            </Button>
          </TooltipButton>
        </TooltipProvider>
      </div>
      <Suspense fallback={<SkeletonCard isGrid={isGrid} />}>
        <div
          className={clsx(
            isGrid ? 'columns-xs xl:columns-sm' : 'flex flex-col gap-4',
          )}
        >
          {layoutMap[layout]}
        </div>
      </Suspense> */}
      <div className='hidden sm:flex gap-2 mb-4'>
        {/* <TooltipProvider>
          <TooltipButton content={'Grid Layout'}>
            <Button
              className='ml-auto'
              variant={!isGrid ? 'outline' : 'default'}
              size='icon'
              onClick={() => router.push(`?layout=grid`)}
            >
              <SquaresIcon />
            </Button>
          </TooltipButton>
          <TooltipButton content={'Stack Layout'}>
            <Button
              variant={isGrid ? 'outline' : 'default'}
              size='icon'
              onClick={() => router.push(`?layout=stack`)}
            >
              <StacksIcon />
            </Button>
          </TooltipButton>
        </TooltipProvider> */}
      </div>
      <Suspense fallback={<SkeletonCard isGrid={isGrid} />}>
        <div
          className={clsx(
            isGrid ? 'columns-xs xl:columns-sm' : 'flex flex-col gap-4',
          )}
        >
          {children[0]}
        </div>
      </Suspense>
    </>
  )
}

export default CardContainer
