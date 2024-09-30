'use client'

import { useMemo } from 'react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'

import IconsWithSprite from '@/components/IconsWithSprite'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { substanceOptions } from '@/config/options'
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
  const totalPaperNumber = papers?.length || 0

  const filteredPapers =
    querySubstance?.length === 0 || !querySubstance
      ? papers
      : papers.filter((paper) =>
          paper.substance.some((substance) =>
            querySubstance.includes(substance),
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

  const onSubstanceBadgeClick = (substance: string) => {
    setQuerySubstance((prev) => {
      if (prev.includes(substance)) {
        return prev.filter((item) => item !== substance)
      } else {
        return [...prev, substance]
      }
    })
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <Select value={querySort} onValueChange={setQuerySort}>
          <SelectTrigger className='w-40 md:w-48'>
            <SelectValue aria-label={querySort} placeholder='Sort' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='desending'>
              <IconsWithSprite
                id={'bar-arrow-down'}
                class='inline mr-1 w-4 h-4'
              />
              <span>Newest First</span>
            </SelectItem>
            <SelectItem value='ascending'>
              <IconsWithSprite
                id={'bar-arrow-up'}
                class='inline mr-1 w-4 h-4'
              />
              <span>Oldest First</span>
            </SelectItem>
          </SelectContent>
        </Select>
        <div className='flex items-center text-primary/70 pr-2'>
          <span className=''>{sortedPapers.length}</span>
          <IconsWithSprite id={'slash'} class='size-4' />
          <span className='mr-1.5'>{totalPaperNumber}</span>
          <IconsWithSprite id={'book-open'} class='inline mr-1 w-5 h-5' />
        </div>
      </div>
      <div className='flex flex-col gap-7 md:gap-10'>
        {sortedPapers.map(
          ({ id, title, authors, publishedAt, substance, slug }) => {
            return (
              <article key={id}>
                <div className='flex flex-col gap-1.5'>
                  <time className='text-primary/70 text-sm'>
                    {dayjs(publishedAt).format('YYYY MMM')}
                  </time>
                  <Link
                    href={`/research/${slug}`}
                    className='text-2xl font-medium font-garamond transition-opacity hover:opacity-50'
                  >
                    {title}
                  </Link>
                  <div className='flex gap-1.5'>
                    {authors.map((author) => (
                      <TooltipProvider key={author}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Avatar className='h-7 w-7' key={author}>
                              <AvatarFallback className='text-xs'>
                                {author.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className='flex items-center'>
                              <IconsWithSprite
                                id={'user-circle'}
                                class='inline mr-1 size-4'
                              />
                              <span className='pr-0.5'>{author}</span>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                  <div className='mt-2'>
                    {substance.map((sub) => (
                      <Badge
                        onClick={(): void => onSubstanceBadgeClick(sub)}
                        key={sub}
                        className='mr-1 cursor-pointer'
                      >
                        {substanceOptions[sub]}
                      </Badge>
                    ))}
                  </div>
                </div>
              </article>
            )
          },
        )}
      </div>
    </div>
  )
}

export default PapersTable
