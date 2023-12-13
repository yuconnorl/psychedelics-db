import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'

import Media from './collections/Media'
import Records from './collections/Records'
import BeforeLogin from './components/BeforeLogin'
import UpdateSection from './components/UpdateSection'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  collections: [Records, Media],
  admin: {
    css: path.resolve(__dirname, './customPayload.css'),
    bundler: webpackBundler(),
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
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
