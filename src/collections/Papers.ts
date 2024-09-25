import type {
  CollectionBeforeChangeHook,
  CollectionConfig,
} from 'payload/types'

import { AuthorManager } from '../fields/AuthorManager/AuthorManager'
import { KeywordManager } from '../fields/KeywordManager/KeywordManager'

const checkDuplicateDOI: CollectionBeforeChangeHook = async ({
  data, // original arguments passed into the operation
  operation,
}) => {
  console.log(operation, 'operation')

  console.log(data)

  return data // return modified operation arguments as necessary
}

const Papers: CollectionConfig = {
  slug: 'papers',
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
      type: 'ui',
      name: 'customArrayAuthorManager',
      admin: {
        components: {
          Field: AuthorManager,
        },
      },
    },
    {
      name: 'authorsField',
      type: 'array',
      label: 'Authors',
      fields: [
        {
          name: 'author',
          type: 'text',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
      },
    },
    {
      name: 'abstract',
      type: 'richText',
      label: 'Abstract',
      required: true,
    },
    {
      type: 'ui',
      name: 'customArrayKeywordManager',
      admin: {
        components: {
          Field: KeywordManager,
        },
      },
    },
    {
      name: 'keywordsField',
      type: 'array',
      label: 'Keywords',
      fields: [
        {
          name: 'keyword',
          type: 'text',
        },
      ],
    },
    {
      name: 'doi',
      label: 'DOI',
      type: 'text',
      admin: {
        description:
          'Digital Object Identifier (DOI) of the paper. e.g. 10.3389/fnhum.2014.00204',
      },
      required: true,
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      required: true,
      admin: {
        description: 'URL to the paper',
      },
    },
  ],
  hooks: {
    beforeChange: [checkDuplicateDOI],
  },
}

export default Papers
