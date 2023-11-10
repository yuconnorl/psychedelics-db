import { webpackBundler } from '@payloadcms/bundler-webpack'
// import { postgresAdapter } from '@payloadcms/db-postgres'

import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import { buildConfig } from 'payload/config'

import { Pages } from './collections/Pages'
import BeforeLogin from './components/BeforeLogin'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import Records from './collections/Records'
import Media from './collections/Media'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  collections: [Pages, Records, Media],
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
