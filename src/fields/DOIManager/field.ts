import type { Field } from 'payload/types'

import { DOIManager } from './DOIManager'

export const CustomDOIField: Field = {
  name: 'doi',
  label: 'DOI',
  type: 'text',
  admin: {
    components: {
      Field: DOIManager,
    },
  },
  required: true,
}
