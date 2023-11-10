import React, { Fragment } from 'react'
import { notFound } from 'next/navigation'

import { getPayloadClient } from '../src/getPayload'
import { Page } from '../src/payload-types'

export default async function Home() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
  })

  const home = docs?.[0] as Page

  // if (!home) {
  //   return notFound()
  // }

  return (
    <main>
      <div>main page</div>
    </main>
  )
}
