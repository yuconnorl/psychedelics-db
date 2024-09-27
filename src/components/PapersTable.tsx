'use client'

import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useQueryState } from 'nuqs'

import type { PaperData } from '@/types'

type PapersTableProps = {
  papers: PaperData[]
}

const PapersTable = ({ papers }: PapersTableProps) => {
  const [substance, setSubstance] = useQueryState('substance')

  return (
    <div>
      <div>Substammce: {substance}</div>
      {papers.map(
        ({ id, title, authors, keywords, doi, url, publishedAt, slug }) => {
          return (
            <div key={id}>
              <div>
                <h3>{title}</h3>
                <div>
                  <h4>Authors: {authors.join(', ')}</h4>
                </div>
                <div>
                  <h4>Keywords: {keywords.join(', ')}</h4>
                </div>
                <div>
                  <h3>Source: {doi}</h3>
                </div>
                <div>
                  <h4>
                    Published At: {dayjs(publishedAt).format('MMM, YYYY')}
                  </h4>
                </div>
              </div>
            </div>
          )
        },
      )}
    </div>
  )
}
export default PapersTable
