'use client'

import { TheEye } from '@/components/Icons'

const headOrTailEyes = (): JSX.Element => {
  const headOrTail = Math.random() < 0.5 ? 'head' : 'tail'

  return (
    <section
      id='five-eyes-image-section'
      className='w-full my-8 md:my-16 h-64 md:h-80 bg-white dark:bg-black rounded-lg group'
    >
      <div className='relative w-full h-full flex justify-center items-center overflow-hidden'>
        {headOrTail === 'head' ? (
          <>
            <TheEye className='absolute animate-fade animate-ease-out animate-delay-500 animate-duration-1000 w-20 md:w-32 lg:w-40 translate-x-32 md:translate-x-56 lg:translate-x-64 text-primary/15' />
            <TheEye className='absolute animate-fade animate-ease-out animate-delay-300 animate-duration-1000 w-20 md:w-32 lg:w-40 translate-x-16 md:translate-x-28 lg:translate-x-32 text-primary/50' />
            <TheEye className='absolute animate-fade animate-ease-out w-20 md:w-32 lg:w-40 z-20' />
            <TheEye className='absolute animate-fade animate-ease-out animate-delay-300 animate-duration-1000 w-20 md:w-32 lg:w-40 -translate-x-16 md:-translate-x-28 lg:-translate-x-32 text-primary/50' />
            <TheEye className='absolute animate-fade animate-ease-out animate-delay-500 animate-duration-1000 w-20 md:w-32 lg:w-40 -translate-x-32 md:-translate-x-56 lg:-translate-x-64 text-primary/15' />
          </>
        ) : (
          <>
            <TheEye className='absolute animate-fade animate-ease-out animate-delay-500 animate-duration-1000 w-28 md:w-32 lg:w-40 translate-y-20 lg:translate-y-24 text-primary/15' />
            <TheEye className='absolute animate-fade animate-ease-out animate-delay-300 animate-duration-1000 w-28 md:w-32 lg:w-40 translate-y-10 text-primary/50' />
            <TheEye className='absolute animate-fade animate-ease-out w-28 md:w-32 lg:w-40 z-20' />
            <TheEye className='absolute animate-fade animate-ease-out animate-delay-300 animate-duration-1000 w-28 md:w-32 lg:w-40 -translate-y-10 text-primary/50' />
            <TheEye className='absolute animate-fade animate-ease-out animate-delay-500 animate-duration-1000 w-28 md:w-32 lg:w-40 -translate-y-20 lg:-translate-y-24 text-primary/15' />
          </>
        )}
      </div>
    </section>
  )
}

export default headOrTailEyes
