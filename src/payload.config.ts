import { webpackBundler } from '@payloadcms/bundler-webpack'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import { buildConfig } from 'payload/config'

import { Pages } from './collections/Pages'
import BeforeLogin from './components/BeforeLogin'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  collections: [Pages],
  admin: {
    bundler: webpackBundler(),
    components: {
      beforeLogin: [BeforeLogin],
    },
  },
  editor: slateEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
