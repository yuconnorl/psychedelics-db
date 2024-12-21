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
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center text-primary/70 pl-2'>
          <BookOpenIcon className='inline mr-1.5 h-[1.125rem] w-[1.125rem]' />
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
              <BarArrowDownIcon className='inline mr-1 size-4' />
              <span>Newest First</span>
            </SelectItem>
            <SelectItem value='ascending'>
              <BarArrowUpIcon className='inline mr-1 size-4' />
              <span>Oldest First</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='flex flex-col gap-3 md:gap-4 px-1 md:pr-3'>
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
                className='p-3 pb-4 md:pb-5 md:p-4 rounded-sm transition-colors hover:bg-secondary/55 group md:max-w-3xl 2xl:max-w-full'
              >
                <div className='flex flex-col gap-2'>
                  <time className='text-primary/70 text-sm'>
                    {dayjs(publishedAt).format('YYYY MMM')}
                  </time>
                  <h3 className='text-2xl 2xl:text-3xl font-medium font-garamond transition-opacity group-hover:opacity-80'>
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
