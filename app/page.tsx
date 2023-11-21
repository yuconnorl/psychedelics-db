import React from 'react'
import { notFound } from 'next/navigation'

import { getPayloadClient } from '../src/getPayload'
import { Page } from '../src/payload-types'

const Home = async (): Promise<JSX.Element> => {
  const payload = await getPayloadClient()

  // if (!home) {
  //   return notFound()
  // }

  return (
    <main className="container">
      <div>main page</div>
    </main>
  )
}

export default Home
