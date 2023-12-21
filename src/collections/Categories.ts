import type { CollectionConfig } from 'payload/types'

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      label: 'Category',
      admin: {
        description: 'Category of the records',
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
                description:
                  'Display name of the category, e.g. "中文演講影片"',
              },
              required: true,
            },
            {
              name: 'value',
              label: 'Slug for the category',
              type: 'text',
              admin: {
                description:
                  'Slug for the category, e.g. "mandarin-speech-video"',
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

export default Categories
