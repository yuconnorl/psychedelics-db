import type { Metadata, ResolvingMetadata } from 'next'

import HeadOrTailEyes from './HeadOrTailEyes'
import HoverRevealImage from './HoverRevealImage'
import PaperSection from './PaperSection'

import { SITE_NAME, SITE_URL } from '@/constants/constants'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: 'Research',
    description: 'Scientific researches across all aspects of Psychedelics',
    openGraph: {
      title: 'Research',
      siteName: SITE_NAME,
      url: `${SITE_URL}/research`,
      description: 'Scientific researches across all aspects of Psychedelics',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Research',
      description: 'Scientific researches across all aspects of Psychedelics',
    },
  }
}

const ResearchPage = (): JSX.Element => {
  return (
    <div className='mt-16'>
      <section className='relative'>
        <h2 className='mb-12 text-5xl md:mb-32 md:text-6xl md:leading-tight'>
          Researches across all <br /> aspects of <HoverRevealImage />
        </h2>
        <div className='text-base text-secondary-foreground sm:text-lg md:ml-auto md:w-[45%]'>
          <p>
            The psychedelics database's research page offers a comprehensive,
            curated collection of peer-reviewed studies on psychedelics. It
            covers pharmacology, therapeutic applications, neuroscience,
            psychology, and cultural significance of substances like psilocybin,
            LSD, MDMA, and DMT. Exploring their effects on mental health,
            consciousness, and potential medical treatments, this organized
            platform serves researchers, clinicians, and enthusiasts seeking
            in-depth psychedelics research. Users can easily navigate studies on
            various compounds, their applications, and broader implications in
            an accessible.
          </p>
        </div>
      </section>
      <HeadOrTailEyes />
      <PaperSection />
    </div>
  )
}

export default ResearchPage
