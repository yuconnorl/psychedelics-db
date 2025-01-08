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
    <div className='flex w-full flex-1 flex-col justify-between'>
      <main className='relative flex flex-1 flex-col flex-wrap items-center justify-center gap-2 px-4 font-garamond text-lg sm:text-2xl md:gap-3'>
        <span className='z-10 text-center'>Ultimate Reality</span>
        <PsychedelicDBIcon className='absolute z-0 h-36 w-36 opacity-[5%] md:h-52 md:w-52' />
      </main>
      <Footer />
    </div>
  )
}
export default AboutPage
