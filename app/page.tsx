import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPayloadClient } from '../src/getPayload'
import { Page } from '../src/payload-types'

import CategoriedHeader from '@/components/CategoriedHeader'
import SearchButton from '@/components/SearchButton'
import { Button } from '@/components/ui/button'

const Home = async (): Promise<JSX.Element> => {
  const payload = await getPayloadClient()

  // if (!home) {
  //   return notFound()
  // }

  return (
    <main className='flex flex-col h-full'>
      <CategoriedHeader />
      <div className='flex-1 flex justify-center items-start mt-24'>
        <div className='flex flex-col w-[36rem] sm:w-[42rem] justify-center text-center'>
          <div className='font-bold text-5xl sm:text-6xl mb-6'>
            The Doors of Perception
          </div>
          <div className='text-lg sm:text-xl text-muted-foreground'>
            Welcome to The Psychedelic Database, a comprehensive resource for
            all things about psychedelics.
          </div>
          <div className='flex gap-4 sm:gap-6 items-center justify-center mt-6 sm:mt-12'>
            <Button className='h-12' asChild>
              <Link href={'/database'}>Collections</Link>
            </Button>
            <SearchButton className='w-[250px] sm:w-[300px] h-12  self-center' />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
