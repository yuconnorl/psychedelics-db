/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { Paper, Record } from '../payload-types'

import type { CATEGORY_OPTIONS } from '@/config/options'

export type CategoryOptionsType = (typeof CATEGORY_OPTIONS)[number]

export type RecordType = Record

export type PaperType = Paper

export type PaperData = Omit<
  PaperType,
  'authorsField' | 'keywordsField' | 'createdAt'
> & {
  authors: string[]
  keywords: string[]
  summary: PaperType['summaryField']
  summaryZhTw: PaperType['summaryZhTwField']
}

export type InfoCard = {
  category: string
  slug: string
  title: string
  url: string
  type: string
  language: string
  metaDescription: string
}

export type CardParamsProps = {
  params: {
    category: CategoryOptionsType
  }
}

export type VectorSearchPoints = {
  id: string
  payload: PaperData
  score: number
  version: number
}
