'use client'

import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'

import { UserCircleIcon } from '@/components/Icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
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

  console.log('querySubstance', querySubstance)

  const filteredPapers =
    querySubstance.length === 0 || !querySubstance
      ? papers
      : papers.filter((paper) =>
          paper.substance.some((substance) =>
            querySubstance.includes(substance),
          ),
        )

  return (
    <div>
      <div>Substammce: {querySubstance}</div>
      <div className='flex flex-col gap-3'>
        {filteredPapers.map(
          ({
            id,
            title,
            authors,
            keywords,
            doi,
            url,
            publishedAt,
            substance,
            slug,
          }) => {
            return (
              <div key={id}>
                <div className='flex flex-col gap-2'>
                  <Link
                    href={`/research/${slug}`}
                    className='text-2xl font-garamond transition-opacity hover:opacity-50'
                  >
                    {title}
                  </Link>
                  <div className='flex gap-1.5'>
                    {authors.map((author) => (
                      <TooltipProvider>
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
                              <UserCircleIcon className='mr-1 inline' />
                              <span className='pr-1'>{author}</span>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                  <div>
                    {substance.map((substance) => (
                      <Badge key={substance} className='mr-2'>
                        {substanceOptions[substance]}
                      </Badge>
                    ))}
                  </div>
                  {/* <div>
                    <h3>Source: {doi}</h3>
                  </div> */}
                  {/* <div>
                    <h4>
                      Published At: {dayjs(publishedAt).format('MMM, YYYY')}
                    </h4>
                  </div> */}
                </div>
              </div>
            )
          },
        )}
      </div>
    </div>
  )
}
export default PapersTable
