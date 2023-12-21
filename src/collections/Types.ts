import type { CollectionConfig } from 'payload/types'

const Types: CollectionConfig = {
  slug: 'types',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      label: 'type',
      admin: {
        description: 'type of the record',
        initCollapsed: false,
      },
      type: 'collapsible',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'displayName',
              label: 'Display name',
              type: 'text',
              admin: {
                description: 'Display name of the tyoe, e.g. "Facebook"',
              },
              required: true,
            },
            {
              name: 'value',
              label: 'Slug for the type',
              type: 'text',
              admin: {
                description: 'Slug for the type, e.g. "facebook"',
              },
              required: true,
              unique: true,
            },
          ],
        },
      ],
    },
  ],
}

export default Types
