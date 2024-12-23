import { Metadata, ResolvingMetadata } from 'next'

import Footer from '@/components/Footer'
import { PsychedelicDBIcon } from '@/components/Icons'

export async function generateMetadata(
  { params },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentData = (await parent) as unknown as Metadata
  const parentOpenGraph = parentData.openGraph
  const parentTwitter = parentData.twitter

  return {
    title: 'About',
    openGraph: {
      title: 'About',
      images: parentOpenGraph.images,
    },
    twitter: {
      title: 'About',
      images: parentTwitter.images,
    },
  }
}

const AboutPage = (): JSX.Element => {
  return (
    <div className='flex flex-col justify-between w-full flex-1'>
      <main className='px-4 font-garamond flex flex-col items-center justify-center flex-wrap flex-1 gap-2 md:gap-3 text-lg sm:text-2xl relative'>
        <span className='z-10'>Nothing good, nothing bad.</span>
        <span className='z-10'>Nothing left, and nothing right.</span>
        <span className='z-10 text-center'>
          Surrender, enbrace the serenity of Ultimate Reality.
        </span>
        <PsychedelicDBIcon className='absolute w-36 h-36 md:w-52 md:h-52 opacity-[5%] z-0' />
      </main>
      <Footer />
    </div>
  )
}
export default AboutPage
