require('dotenv').config()
const path = require('path')
const { withPayload } = require('@payloadcms/next-payload')

module.exports = withPayload(
  {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['localhost', process.env.NEXT_PUBLIC_PAYLOAD_URL],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
        {
          protocol: 'http',
          hostname: '**',
        },
      ],
    },
  },
  {
    // The second argument to `withPayload`
    // allows you to specify paths to your Payload dependencies
    // and configure the admin route to your Payload CMS.

    // Point to your Payload config (required)
    configPath: path.resolve(__dirname, './src/payload.config.ts'),

    // Set a custom Payload admin route (optional, default is `/admin`)
    // NOTE: Read the "Set a custom admin route" section in the payload/next-payload README.
    adminRoute: '/admin',
  },
)
