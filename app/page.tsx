import React from 'react'
import Link from 'next/link'

import AlgoliaSearchComponent from '@/components/algolia/AlgoliaSearchComponent'
import SplineComponent from '@/components/SplineComponent'
import { Button } from '@/components/ui/button'

const Home = async (): Promise<JSX.Element> => {
  return (
    <>
      <main className='flex flex-col flex-1 px-3'>
        <div className='flex-1 flex justify-start items-center mt-10 sm:mt-20 flex-col relative'>
          <div className='flex flex-col w-full justify-center items-center text-center lg:w-3/4'>
            <h1 className='font-semibold text-5xl sm:text-6xl mb-3 sm:mb-6'>
              <span>The Doors of Perception</span>
            </h1>
            <p className='text-lg sm:text-xl text-muted-foreground w-full sm:w-[80%] max-w-xl'>
              Welcome to Psychedelics Database, a comprehensive resource for all
              things about psychedelics.
            </p>
            <div className='flex gap-3 flex-wrap sm:gap-5 items-center justify-center mt-3 sm:mt-6'>
              <Button className='h-12' asChild>
                <Link href={'/database'}>Collections</Link>
              </Button>
              <AlgoliaSearchComponent
                searchBarClassName='w-[200px] sm:w-[300px] h-12 self-center flex'
                searchIconClassName='hidden'
              />
            </div>
          </div>
          <div className='fixed w-full h-[80%] -bottom-12 md:bottom-0 left-0 -z-10'>
            <SplineComponent />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
