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
    title: '資料庫',
    description:
      '從啟靈藥物的基本知識到減害資訊，涵蓋研究、安全性、作用效果等各方面專業知識的資料庫',
    openGraph: {
      title: '資料庫',
      siteName: SITE_NAME,
      url: `${SITE_URL}/database`,
      description:
        '從啟靈藥物的基本知識到減害資訊，涵蓋研究、安全性、作用效果等各方面專業知識的資料庫',
    },
    twitter: {
      card: 'summary_large_image',
      title: '資料庫',
      description:
        '從啟靈藥物的基本知識到減害資訊，涵蓋研究、安全性、作用效果等各方面專業知識的資料庫',
    },
  }
}

const CategoriesCard = ({ categoryTitle, category }): JSX.Element => {
  return (
    <article className='group relative h-fit'>
      <Link href={`/database/${category}`} prefetch={false}>
        <Card className='break-inside z-10 transition-transform sm:group-hover:-translate-x-2 sm:group-hover:-translate-y-2'>
          <CardHeader className='p-4 md:p-6'>
            <CardTitle className='text-base font-normal md:text-lg'>
              {categoryTitle}
            </CardTitle>
            <div className='mt-0 text-xs text-muted-foreground/80 sm:text-sm'>
              {category}
            </div>
          </CardHeader>
        </Card>
      </Link>
      <div className='absolute left-1 top-1 -z-10 h-[calc(100%-5px)] w-[calc(100%-5px)] rounded-lg bg-foreground' />
    </article>
  )
}

const DatabasePage = async (): Promise<JSX.Element> => {
  const categories = await getCategories()
  const categoriesNumber = categories.length

  return (
    <div className=''>
      <AspectRatio
        className='relative my-2 flex items-center justify-center overflow-hidden rounded-lg border border-muted-foreground/10'
        ratio={21 / 9}
      >
        <Image
          fill
          src={imgPsychedelicDatabaseIntro}
          alt='PsycheVault'
          priority
          placeholder='blur'
          sizes='(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 100vw'
          className='rounded-md object-cover object-center'
        />
        {/* <div className='noise absolute h-full w-full'></div> */}
      </AspectRatio>
      <div className='my-6 text-4xl font-semibold text-primary'>Intro</div>

      <div className='text-base text-secondary-foreground sm:text-lg'>
        <p>
          The PsycheVault aims to serve as the leading information hub around
          therapeutic and recreational usage of psychedelic compounds.
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
        <div className='mb-6 mt-8 text-4xl font-semibold text-primary'>
          Categories
        </div>
        <div className='mb-6 text-base text-secondary-foreground sm:text-lg'>
          The PsycheVault is organized into {categoriesNumber} main categories,
          including:
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
