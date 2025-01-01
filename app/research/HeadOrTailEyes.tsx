'use client'

import { TheEye } from '@/components/Icons'

const headOrTailEyes = (): JSX.Element => {
  const headOrTail = Math.random() < 0.5 ? 'head' : 'tail'

  return (
    <section
      id='five-eyes-image-section'
      className='group my-8 h-64 w-full rounded-lg bg-white md:my-16 md:h-80 dark:bg-black'
    >
      <div className='relative flex h-full w-full items-center justify-center overflow-hidden'>
        {headOrTail === 'head' ? (
          <>
            <TheEye className='absolute w-20 translate-x-32 animate-fade text-primary/15 animate-delay-500 animate-duration-1000 animate-ease-out md:w-32 md:translate-x-56 lg:w-40 lg:translate-x-64' />
            <TheEye className='absolute w-20 translate-x-16 animate-fade text-primary/50 animate-delay-300 animate-duration-1000 animate-ease-out md:w-32 md:translate-x-28 lg:w-40 lg:translate-x-32' />
            <TheEye className='absolute z-20 w-20 animate-fade animate-ease-out md:w-32 lg:w-40' />
            <TheEye className='absolute w-20 -translate-x-16 animate-fade text-primary/50 animate-delay-300 animate-duration-1000 animate-ease-out md:w-32 md:-translate-x-28 lg:w-40 lg:-translate-x-32' />
            <TheEye className='absolute w-20 -translate-x-32 animate-fade text-primary/15 animate-delay-500 animate-duration-1000 animate-ease-out md:w-32 md:-translate-x-56 lg:w-40 lg:-translate-x-64' />
          </>
        ) : (
          <>
            <TheEye className='absolute w-28 translate-y-20 animate-fade text-primary/15 animate-delay-500 animate-duration-1000 animate-ease-out md:w-32 lg:w-40 lg:translate-y-24' />
            <TheEye className='absolute w-28 translate-y-10 animate-fade text-primary/50 animate-delay-300 animate-duration-1000 animate-ease-out md:w-32 lg:w-40' />
            <TheEye className='absolute z-20 w-28 animate-fade animate-ease-out md:w-32 lg:w-40' />
            <TheEye className='absolute w-28 -translate-y-10 animate-fade text-primary/50 animate-delay-300 animate-duration-1000 animate-ease-out md:w-32 lg:w-40' />
            <TheEye className='absolute w-28 -translate-y-20 animate-fade text-primary/15 animate-delay-500 animate-duration-1000 animate-ease-out md:w-32 lg:w-40 lg:-translate-y-24' />
          </>
        )}
      </div>
    </section>
  )
}

export default headOrTailEyes
