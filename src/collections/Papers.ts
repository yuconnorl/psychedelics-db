import type {
  CollectionBeforeChangeHook,
  CollectionConfig,
} from 'payload/types'

import CustomSlugField from '../components/CustomSlugField'
import { PAYLOAD_SUBSTANCE_OPTIONS } from '../config/options'
import { AuthorManager } from '../fields/AuthorManager/AuthorManager'
import { KeywordManager } from '../fields/KeywordManager/KeywordManager'

export const validateSlug = (value: string) => {
  return (value !== undefined && value !== '') || `${value} should not be empty`
}

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
      admin: {
        initCollapsed: true,
      },
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
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
      },
    },
    {
      name: 'substance',
      type: 'select',
      hasMany: true,
      required: true,
      admin: {
        isClearable: true,
        isSortable: true,
      },
      options: PAYLOAD_SUBSTANCE_OPTIONS,
    },
    {
      name: 'abstract',
      type: 'richText',
      label: 'Abstract',
      required: true,
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
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'keyword',
          type: 'text',
        },
      ],
    },
    {
      name: 'journal',
      label: 'Journal',
      type: 'text',
      required: true,
      admin: {
        description: 'Journal to the paper. Leave - if not applicable',
      },
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
    {
      name: 'isVectorized',
      type: 'checkbox', // required
      label: 'Vectorized',
      defaultValue: false,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'viewCount',
      type: 'number',
      defaultValue: 0,
      required: true,
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
  ],
  hooks: {
    beforeChange: [checkDuplicateDOI],
  },
}

export default Papers
