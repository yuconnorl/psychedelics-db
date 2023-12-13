'use client'
import { Suspense } from 'react'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'

import { SquaresIcon, StacksIcon } from './Icons'
import TooltipButton from './TooltipButton'

import SkeletonCard from '@/components/SkeletonCard'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import { DEFAULT_LAYOUT } from '@/config/general'
import { ChildrenProps } from '@/types'

const CardContainer = ({ children }: ChildrenProps): JSX.Element => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const layoutMap = {
    grid: children![0],
    stack: children![1],
  }

  const layout = searchParams?.get('layout') || DEFAULT_LAYOUT
  const isGrid = layout === 'grid'

  return (
    <>
      <div className='hidden sm:flex gap-2 mb-4'>
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
            isGrid ? 'columns-3xs lg:columns-xs' : 'flex flex-col gap-4',
          )}
        >
          {layoutMap[layout]}
        </div>
      </Suspense>
    </>
  )
}

export default CardContainer
