import type { Metadata } from 'next'

import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About',
  description: 'About',
}

const AboutPage = (): JSX.Element => {
  return (
    <main className='flex flex-col justify-between w-full'>
      <div className='prose flex-1'>
        Nothing's good, nothing's bad.
        <br />
        Nothing left, and nothing right.
        <br />
        Surrender, and enbrace the serenity of Ultimate Reality.
      </div>
      <Footer />
    </main>
  )
}
export default AboutPage
