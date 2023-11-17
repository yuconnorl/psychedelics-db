/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { CATEGORY_OPTIONS } from '@/config/options'

export type CategoryOptionsType = (typeof CATEGORY_OPTIONS)[number]

export type RecordType = {
  id: string
  title: string
  language: string
  url: string
  createdAt: string
  updatedAt: string
  category: CategoryOptionsType
  slug: string
  type: string
}

export type InfoCard = {
  category: string
  slug: string
  title: string
  url: string
  type: string
  language: string
}

export type CardParamsProps = {
  params: {
    category: string
  }
}
