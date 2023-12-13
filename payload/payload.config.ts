import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { buildConfig } from 'payload/config'

import Media from '../src/collections/Media'
import Records from '../src/collections/Records'
import BeforeLogin from '../src/components/BeforeLogin'
import UpdateSection from '../src/components/UpdateSection'

export default buildConfig({
  collections: [Records, Media],
  globals: [
    // Your globals here
  ],
  admin: {
    components: {
      beforeLogin: [BeforeLogin],
      afterDashboard: [UpdateSection],
    },
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  typescript: {
    outputFile: path.resolve(__dirname, '../src/payload-types.ts'),
  },
})
