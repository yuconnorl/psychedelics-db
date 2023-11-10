import type { CollectionConfig } from 'payload/types'

import formatSlug from '../utilities/formatSlug'


const categoryOptions  = [
  'psychedelics-fundamentals',
  'online-media',
  'research-centre',
  'ngo-research-institute',
  'private-research-institute',
  'ngo/foundation',
  'therapy-institue',
  'health-n-safety',
  'psychotherapy-training',
  'decriminalize-policy',
  'psychotherapists',
  'press-n-journal',
  'conference',
  'podcast-speech',
]

const typeOptions = [
  'video',
  'instagram',
  'facebook',
  'podcast',
  'article',
  'website',
  'thesis',
  'pdf',
  'book',
]

const languageOptions = ['zh-tw', 'en']

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
          options: categoryOptions
        },
        {
          name: 'type',
          label: 'Type of Content',
          type: 'select',
          options: typeOptions
        },
      ]
    },
    {
      name: 'language',
      label: 'Language',
      type: 'select',
      options: languageOptions,
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
