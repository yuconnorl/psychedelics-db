import { webpackBundler } from '@payloadcms/bundler-webpack'
// import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload/config'

import Media from './collections/Media'
import Records from './collections/Records'
import BeforeLogin from './components/BeforeLogin'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  collections: [Records, Media],
  admin: {
    bundler: webpackBundler(),
    components: {
      beforeLogin: [BeforeLogin],
    },
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
