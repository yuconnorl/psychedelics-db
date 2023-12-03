import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { CATEGORY_OPTIONS_MAP } from '@/config/options'

export const metadata: Metadata = {
  title: 'Database',
  description: 'Database',
}

const CategoriesCard = ({ categoryTitle, category }) => {
  return (
    <div className='relative group h-fit'>
      <Link href={`/database/${category}`}>
        <Card className='break-inside sm:group-hover:-translate-x-2 sm:group-hover:-translate-y-2 transition-transform z-10'>
          <CardHeader>
            <CardTitle className='font-normal text-lg'>
              {categoryTitle}
            </CardTitle>
          </CardHeader>
        </Card>
      </Link>
      <div className='absolute bg-foreground w-[calc(100%-5px)] h-[calc(100%-5px)] top-1 left-1 rounded-lg -z-10' />
    </div>
  )
}

const DatabasePage = (): JSX.Element => {
  const categoriesNumber = Object.keys(CATEGORY_OPTIONS_MAP).length

  return (
    <div className=''>
      <AspectRatio
        className='my-2 border-muted-foreground/20 border rounded-lg'
        ratio={21 / 9}
      >
        <Image
          fill
          src={'/psychedelic-database-intro.jpg'}
          alt='Image'
          sizes='(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 100vw'
          className='rounded-md object-cover object-center'
        />
      </AspectRatio>
      <div className='text-4xl font-semibold text-primary my-6'>Intro</div>
      <div className='text-secondary-foreground text-base sm:text-lg'>
        <div>
          The psychedelic database aims to serve as the leading information hub
          around therapeutic and recreational usage of psychedelic compounds.
          Containing data on over 100 psychedelic substances, it details
          quantitative information on dosing, effects, safety as well as
          qualitative trip reports and user perspectives. Researchers can
          examine the wealth of aggregated data to identify relationships
          between dose taken, subjective effects, physiological changes and
          psychological impacts.
        </div>
        <div className='mt-4'>
          Alongside supporting scientific research, the database also houses
          resources for public education around responsible psychedelic use. It
          contains over 300 educational articles and 100 podcast episodes and
          videos that provide balanced perspectives on benefits and risks. Users
          can also find a directory of psychedelic researchers, therapists,
          retreat centers and decriminalization advocates. With rigorous
          protocols ensuring high data quality, the psychedelic database
          facilitates scientific understanding and social awareness of these
          profoundly consciousness-altering compounds through a multifaceted,
          evidence-based approach.
        </div>
      </div>
      <div>
        <div className='text-4xl font-semibold text-primary my-6'>
          Categories
        </div>
        <div className='mb-4 text-secondary-foreground text-base sm:text-lg'>
          The Psychedelic Database is organized into {categoriesNumber} main
          categories:
        </div>
        <div className='grid grid-cols-[1fr_1fr] gap-3'>
          {Object.entries(CATEGORY_OPTIONS_MAP).map(
            ([category, categoryTitle]) => (
              <CategoriesCard
                key={category}
                categoryTitle={categoryTitle}
                category={category}
              />
            ),
          )}
        </div>
      </div>
    </div>
  )
}

export default DatabasePage
