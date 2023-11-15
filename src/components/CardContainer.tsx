'use client'

import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'

import { Squares, Stacks } from './Icons'

import { Button } from '@/components/ui/button'

const CardContainer = ({ children }) => {
  const searchParams = useSearchParams()

  const router = useRouter()

  const layoutMap = {
    grid: children[0],
    stack: children[1],
  }

  const layout = searchParams.get('layout')
  const isGrid = layout === 'grid'

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Button
          className="ml-auto"
          variant="outline"
          size="icon"
          onClick={() => router.push(`?layout=grid`)}
        >
          <Squares />
        </Button>
        <Button variant="outline" size="icon" onClick={() => router.push(`?layout=stack`)}>
          <Stacks />
        </Button>
      </div>
      <div
        className={clsx(
          isGrid ? 'flex flex-col lg:grid lg:grid-cols-2 gap-4' : 'flex flex-col gap-4',
        )}
      >
        {layoutMap[layout]}
      </div>
    </div>
  )
}

export default CardContainer
