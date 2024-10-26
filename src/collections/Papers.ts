import type {
  CollectionBeforeChangeHook,
  CollectionConfig,
} from 'payload/types'

import CustomSlugField from '../components/CustomSlugField'
import { PAYLOAD_SUBSTANCE_OPTIONS } from '../config/options'
import { AuthorManager } from '../fields/AuthorManager/AuthorManager'
import { CustomDOIField } from '../fields/DOIManager/field'
import { CustomFileURLField } from '../fields/FileUrlManager/field'
import { KeywordManager } from '../fields/KeywordManager/KeywordManager'
import { CustomURLField } from '../fields/UrlManager/field'

export const validateSlug = (value: string): true | string => {
  return (value !== undefined && value !== '') || `${value} should not be empty`
}

const checkDuplicateDOI: CollectionBeforeChangeHook = async ({ data }) => {
  return data
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
    CustomDOIField,
    CustomURLField,
    CustomFileURLField,
    // {
    //   name: 'url',
    //   label: 'URL',
    //   type: 'text',
    //   required: true,
    //   admin: {
    //     description: 'URL to the paper',
    //   },
    // },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
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
      name: 'summaryField',
      type: 'array',
      label: 'Summary',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'summary',
          type: 'text',
        },
      ],
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
      name: 'isVectorized',
      type: 'checkbox',
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
