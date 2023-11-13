import React, { Fragment } from 'react'
import { notFound } from 'next/navigation'

import { getPayloadClient } from '../src/getPayload'
import { Page } from '../src/payload-types'

export default async function Home() {
  const payload = await getPayloadClient()

  // if (!home) {
  //   return notFound()
  // }

  return (
    <main>
      <div>main page</div>
    </main>
  )
}
