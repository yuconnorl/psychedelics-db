/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { Record } from '../payload-types'

import type { CATEGORY_OPTIONS } from '@/config/options'

export type CategoryOptionsType = (typeof CATEGORY_OPTIONS)[number]

export type RecordType = Record

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
