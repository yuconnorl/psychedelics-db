import { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { getCategories } from '@/api/general'
import imgPsychedelicDatabaseIntro from '@/assets/psychedelic-database-intro.jpeg'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { SITE_NAME, SITE_URL } from '@/constants/constants'

export async function generateMetadata(
  { params },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentData = (await parent) as unknown as Metadata
  const parentOpenGraph = parentData.openGraph
  const parentTwitter = parentData.twitter

  return {
    title: 'Database',
    description:
      'Psychedelics Database is the leading information hub around therapeutic and recreational usage of psychedelic compounds, managed by the Taiwan Psychedelic Collective',
    openGraph: {
      title: 'Database',
      siteName: SITE_NAME,
      url: `${SITE_URL}/database`,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Database',
    },
  }
}

const CategoriesCard = ({ categoryTitle, category }): JSX.Element => {
  return (
    <article className='relative group h-fit'>
      <Link href={`/database/${category}`}>
        <Card className='break-inside sm:group-hover:-translate-x-2 sm:group-hover:-translate-y-2 transition-transform z-10'>
          <CardHeader className='p-4 md:p-6'>
            <CardTitle className='font-normal text-base md:text-lg'>
              {categoryTitle}
            </CardTitle>
            <div className='mt-0 text-xs sm:text-sm text-muted-foreground/80'>
              {category}
            </div>
          </CardHeader>
        </Card>
      </Link>
      <div className='absolute bg-foreground w-[calc(100%-5px)] h-[calc(100%-5px)] top-1 left-1 rounded-lg -z-10' />
    </article>
  )
}

const DatabasePage = async (): Promise<JSX.Element> => {
  const categories = await getCategories()
  const categoriesNumber = categories.length

  return (
    <div className=''>
      <AspectRatio
        className='my-2 border-muted-foreground/10 border rounded-lg relative flex justify-center items-center overflow-hidden'
        ratio={21 / 9}
      >
        <Image
          fill
          src={imgPsychedelicDatabaseIntro}
          alt='Psychedelic database'
          priority
          placeholder='blur'
          sizes='(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 100vw'
          className='rounded-md object-cover object-center'
        />
        <div className='noise w-full h-full absolute'></div>
      </AspectRatio>
      <div className='text-4xl font-semibold text-primary my-6'>Intro</div>

      <div className='text-secondary-foreground text-base sm:text-lg'>
        <p>
          The psychedelics database aims to serve as the leading information hub
          around therapeutic and recreational usage of psychedelic compounds.
          Containing data on over 100 psychedelic substances, it details
          quantitative information on dosing, effects, safety as well as
          qualitative trip reports and user perspectives. Researchers can
          examine the wealth of aggregated data to identify relationships
          between dose taken, subjective effects, physiological changes and
          psychological impacts.
        </p>
        <div className='mt-4'>
          <p>
            Alongside supporting scientific research, the database also houses
            resources for public education around responsible psychedelic use.
            It contains over 300 educational articles and 100 podcast episodes
            and videos that provide balanced perspectives on benefits and risks.
            Users can also find a directory of psychedelic researchers,
            therapists, retreat centers and decriminalization advocates. With
            rigorous protocols ensuring high data quality, the psychedelic
            database facilitates scientific understanding and social awareness
            of these profoundly consciousness-altering compounds through a
            multifaceted, evidence-based approach.
          </p>
        </div>
      </div>
      <>
        <div className='text-4xl font-semibold text-primary mt-8 mb-6'>
          Categories
        </div>
        <div className='mb-6 text-secondary-foreground text-base sm:text-lg'>
          The Psychedelics Database is organized into {categoriesNumber} main
          categories, including:
        </div>
        <div className='grid grid-cols-[1fr_1fr] gap-3'>
          {categories.map(({ displayName, value }) => (
            <CategoriesCard
              key={value}
              categoryTitle={displayName}
              category={value}
            />
          ))}
        </div>
      </>
    </div>
  )
}

export default DatabasePage
