import type { CollectionBeforeOperationHook, CollectionConfig } from 'payload/types'

const format = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-/]+/g, '')
    .toLowerCase()

const beforeOperationHook: CollectionBeforeOperationHook = async ({ args }) => {
  const files = args.req?.files
  // formate file name into kebab case
  if (files && files.file && files.file.name) {
    const splitArray = files.file.name.split('.')
    const fileExtension = splitArray.at(-1)
    const rest = format(splitArray.splice(0, splitArray.length - 1).join('.'))
    files.file.name = `${rest}.${fileExtension}`
  }
}

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: 'media',
  },
  hooks: {
    beforeOperation: [beforeOperationHook],
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'filename',
      label: 'File name',
      type: 'text',
      required: true,
    },
    {
      name: 'alt',
      label: 'Alt text',
      type: 'text',
      required: true,
    },
  ],
}

export default Media
