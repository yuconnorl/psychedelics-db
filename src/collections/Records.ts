import type { CollectionConfig } from 'payload/types'

import CustomSlugField from '../components/CustomSlugField'
import {
  LANGUAGE_OPTIONS,
  PAYLOAD_CATEGORY_OPTIONS,
  TYPE_OPTIONS,
} from '../config/options'

export const validateSlug = (value: string) => {
  return (value !== undefined && value !== '') || `${value} should not be empty`
}

const Records: CollectionConfig = {
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
          required: true,
        },
        {
          name: 'type',
          label: 'Type of Content',
          type: 'select',
          options: [...TYPE_OPTIONS],
          defaultValue: 'website',
          required: true,
        },
      ],
    },
    {
      name: 'metaDescription',
      label: 'Description',
      type: 'textarea',
      defaultValue: () => '',
      admin: {
        placeholder:
          'Optional. If provided, will be used in meta description and overwrites the default description from record resource, like website.',
      },
    },
    {
      name: 'language',
      label: 'Language',
      type: 'select',
      options: [...LANGUAGE_OPTIONS],
      defaultValue: 'en',
      required: true,
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      defaultValue: ' ',
      required: true,
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
      validate: validateSlug,
      admin: {
        position: 'sidebar',
        description:
          'Slug should format into kebab case and delete any extra hyphen, e.g. "some-slug"',
        components: {
          Field: CustomSlugField,
        },
      },
      required: true,
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

export default Records
