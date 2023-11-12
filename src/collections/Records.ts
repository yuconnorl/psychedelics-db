import type { CollectionConfig } from 'payload/types'

import formatSlug from '../utilities/formatSlug'

import { CATEGORY_OPTIONS, LANGUAGE_OPTIONS, TYPE_OPTIONS } from '@/config/options'

export const Records: CollectionConfig = {
  slug: 'records',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          options: [...CATEGORY_OPTIONS],
        },
        {
          name: 'type',
          label: 'Type of Content',
          type: 'select',
          options: [...TYPE_OPTIONS],
        },
      ],
    },
    {
      name: 'language',
      label: 'Language',
      type: 'select',
      options: [...LANGUAGE_OPTIONS],
      required: true,
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
    },
    {
      name: 'richText',
      type: 'richText',
      label: 'Content',
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
  ],
}

export default Records
