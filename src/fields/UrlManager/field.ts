import type { Field } from 'payload/types'

import { UrlManager } from './UrlManager'

export const CustomURLField: Field = {
  name: 'url',
  label: 'URL',
  type: 'text',
  required: true,
  admin: {
    components: {
      Field: UrlManager,
    },
  },
}
