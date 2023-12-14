import type { CollectionConfig } from 'payload/types'

import {
  LANGUAGE_OPTIONS,
  PAYLOAD_CATEGORY_OPTIONS,
  TYPE_OPTIONS,
} from '@configs/options'
import formatSlug from '../utilities/formatSlug'

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
          options: [...PAYLOAD_CATEGORY_OPTIONS],
        },
        {
          name: 'type',
          label: 'Type of Content',
          type: 'select',
          options: [...TYPE_OPTIONS],
          defaultValue: 'website',
        },
      ],
    },
    {
      name: 'language',
      label: 'Language',
      type: 'select',
      options: [...LANGUAGE_OPTIONS],
      required: true,
      defaultValue: 'en',
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
        description:
          'Slug should format into kebab case and delete any extra hyphen, e.g. "some-slug"',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
    {
      label: 'Advanced Options',
      type: 'collapsible',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'isRecordShow',
          type: 'checkbox',
          label: 'Record visibility',
          required: true,
          defaultValue: true,
        },
      ],
    },
  ],
}
