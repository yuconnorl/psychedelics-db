import type { Metadata } from 'next'
import Image from 'next/image'

import HoverRevealImage from './HoverRevealImage'
import PaperSection from './PaperSection'

import imgTheEyes from '@/assets/the-eyes.png'

export const metadata: Metadata = {
  title: 'Research',
  description: 'Scientific Researches across all aspects of Psychedelics',
}

const ResearchPage = async (): Promise<JSX.Element> => {
  return (
    <div className='mt-16'>
      <div className='relative'>
        <h2 className='text-5xl md:text-6xl mb-12 md:mb-32 md:leading-tight'>
          Researches across all <br /> aspects of <HoverRevealImage />
        </h2>
        <div className='text-secondary-foreground text-base sm:text-lg md:ml-auto md:w-[45%]'>
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
      </div>
      <div className='w-full my-8 md:my-16'>
        <Image
          src={imgTheEyes}
          alt='The eyes'
          className='rounded-lg w-full'
          quality={75}
          placeholder='blur'
        />
      </div>
      <PaperSection />
    </div>
  )
}

export default ResearchPage
