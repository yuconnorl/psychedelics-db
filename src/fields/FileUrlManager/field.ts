import type { Field } from 'payload/types'

import { FileUrlManager } from './FileUrlManager'

export const CustomFileURLField: Field = {
  name: 'fileUrl',
  label: 'File URL',
  type: 'text',
  admin: {
    components: {
      Field: FileUrlManager,
    },
  },
}
