'use client'

import React, { useMemo, useState } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = {
  totalElements: number
  itemsPerPage: number
  siblingCount?: number
  onPageChange: (page: number) => void
}

const CustomPagination = ({
  totalElements,
  itemsPerPage,
  siblingCount = 1,
  onPageChange,
}: Props): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1)

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalElements / itemsPerPage)
    const totalPageNumbers = siblingCount + 5

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    )

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount
      let leftRange = range(1, leftItemCount)

      return [...leftRange, '...', totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      )
      return [firstPageIndex, '...', ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex]
    }
  }, [totalElements, itemsPerPage, siblingCount, currentPage])

  const onNext = (): void => {
    if (currentPage === Math.ceil(totalElements / itemsPerPage)) return
    setCurrentPage(currentPage + 1)
    onPageChange(currentPage + 1)
  }

  const onPrevious = (): void => {
    if (currentPage === 1) return
    setCurrentPage(currentPage - 1)
    onPageChange(currentPage - 1)
  }

  const onPageClick = (page): void => {
    if (page === currentPage) return
    setCurrentPage(page)
    onPageChange(page)
  }

  return (
    <nav
      role='navigation'
      aria-label='pagination'
      className={cn('mx-auto gap-1 flex w-full justify-center mt-8')}
    >
      <Button
        onClick={onPrevious}
        variant='ghost'
        size='icon'
        disabled={currentPage === 1}
        className='disabled:opacity-50 px-1.5 md:px-3 w-8 md:w-10'
      >
        <ChevronLeftIcon />
      </Button>
      {paginationRange?.map((pageNumber, index) => (
        <Button
          key={index}
          onClick={(): void => pageNumber !== '...' && onPageClick(pageNumber)}
          variant={pageNumber === currentPage ? 'outline' : 'ghost'}
          size='icon'
          className={cn(
            pageNumber === '...'
              ? 'cursor-default hover:bg-transparent w-5'
              : 'px-1.5 md:px-3 w-8 md:w-10',
          )}
        >
          {pageNumber}
        </Button>
      ))}
      <Button
        onClick={onNext}
        variant='ghost'
        size='icon'
        disabled={currentPage === Math.ceil(totalElements / itemsPerPage)}
        className='disabled:opacity-50 px-1.5 md:px-3 w-8 md:w-10'
      >
        <ChevronRightIcon />
      </Button>
    </nav>
  )
}

// Utility function to create a range of numbers
const range = (start: number, end: number): Array<number> => {
  let length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

export default CustomPagination
