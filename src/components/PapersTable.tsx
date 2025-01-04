'use client'

import { useEffect, useMemo } from 'react'
import dayjs from 'dayjs'
import Link from 'next/link'
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from 'nuqs'

import AuthorBadges from '@/components/AuthorBadges'
import CustomPagination from '@/components/CustomPagination'
import {
  BarArrowDownIcon,
  BarArrowUpIcon,
  BookOpenIcon,
  SlashIcon,
} from '@/components/Icons'
import SubstanceBadge from '@/components/SubstanceBadge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PAPER_ITEM_PER_PAGE } from '@/constants/constants'
import type { PaperData } from '@/types'

type PapersTableProps = {
  papers: PaperData[]
}

const PapersTable = ({ papers }: PapersTableProps): JSX.Element => {
  const [querySubstance, setQuerySubstance] = useQueryState(
    'substance',
    parseAsArrayOf(parseAsString),
  )

  const [querySort, setQuerySort] = useQueryState(
    'sort',
    parseAsString.withDefault(''),
  )

  const [queryPage, setQueryPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1),
  )

  const totalPaperNumber = papers?.length || 0

  const filteredPapers =
    querySubstance?.length === 0 || !querySubstance
      ? papers
      : papers.filter((paper) =>
          paper.substance.some((substance) =>
            querySubstance?.includes(substance),
          ),
        )

  const sortedPapers = useMemo(
    () =>
      !querySort
        ? filteredPapers
        : querySort === 'ascending'
          ? filteredPapers.sort(
              (a, b) =>
                dayjs(a.publishedAt).valueOf() - dayjs(b.publishedAt).valueOf(),
            )
          : filteredPapers.sort(
              (a, b) =>
                dayjs(b.publishedAt).valueOf() - dayjs(a.publishedAt).valueOf(),
            ),
    [querySort, filteredPapers],
  )

  const pagedPapers = sortedPapers?.slice(
    (queryPage - 1) * PAPER_ITEM_PER_PAGE,
    queryPage * PAPER_ITEM_PER_PAGE,
  )

  const onSubstanceBadgeClick = (substance: string): void => {
    setQuerySubstance((prev) => {
      if (prev === null) {
        return [substance]
      } else if (prev?.includes(substance)) {
        return prev.filter((item) => item !== substance)
      } else {
        return [...prev, substance]
      }
    })
  }

  useEffect(() => {
    if (sortedPapers.length <= PAPER_ITEM_PER_PAGE) {
      setQueryPage(1)
    }
  }, [sortedPapers])

  return (
    <div className='flex flex-col gap-5'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center pl-2 text-primary/70'>
          <BookOpenIcon className='mr-1.5 inline h-[1.125rem] w-[1.125rem]' />
          <span>{sortedPapers.length}</span>
          <SlashIcon className='size-4' />
          <span>{totalPaperNumber}</span>
        </div>
        <Select value={querySort} onValueChange={setQuerySort}>
          <SelectTrigger className='w-40 md:w-48'>
            <SelectValue aria-label={querySort} placeholder='Sort' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='desending'>
              <BarArrowDownIcon className='mr-1 inline size-4' />
              <span>Newest First</span>
            </SelectItem>
            <SelectItem value='ascending'>
              <BarArrowUpIcon className='mr-1 inline size-4' />
              <span>Oldest First</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='flex flex-col gap-1 md:gap-2 md:px-1 md:pr-3'>
        {pagedPapers.map(
          ({ id, title, authors, publishedAt, substance, slug }) => {
            const link = querySubstance?.length
              ? `/research/${slug}?substance=${querySubstance?.join(',')}`
              : `/research/${slug}`

            return (
              <Link
                key={id}
                href={link}
                prefetch={false}
                className='group rounded-sm pb-3 pl-3 pr-1.5 pt-2 transition-colors hover:bg-secondary/55 md:max-w-3xl md:p-4 md:pb-5 2xl:max-w-full'
              >
                <div className='flex flex-col gap-2'>
                  <time className='text-sm text-primary/70'>
                    {dayjs(publishedAt).format('YYYY MMM')}
                  </time>
                  <h3 className='font-garamond text-2xl font-medium transition-opacity group-hover:opacity-80 2xl:text-3xl'>
                    {title}
                  </h3>
                  <AuthorBadges authors={authors} />
                  <div className='mt-2 flex gap-1'>
                    {substance.map((sub) => (
                      <SubstanceBadge
                        onClick={(e): void => {
                          e.preventDefault()
                          onSubstanceBadgeClick(sub)
                        }}
                        key={sub}
                        substance={sub}
                        className='cursor-pointer'
                      />
                    ))}
                  </div>
                </div>
              </Link>
            )
          },
        )}
      </div>
      {sortedPapers.length > PAPER_ITEM_PER_PAGE && (
        <CustomPagination
          totalElements={sortedPapers.length}
          itemsPerPage={PAPER_ITEM_PER_PAGE}
          onPageChange={setQueryPage}
        />
      )}
    </div>
  )
}

export default PapersTable
