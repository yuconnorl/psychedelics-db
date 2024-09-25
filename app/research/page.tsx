import dayjs from 'dayjs'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { getPapers } from '@/api/general'
import imgTheEyes from '@/assets/the-eyes.png'

export const metadata: Metadata = {
  title: 'Research',
  description: 'Scientific Researches across all aspects of Psychedelics',
}

const ResearchPage = async (): Promise<JSX.Element> => {
  const papers = await getPapers()
  // console.log(papers)

  return (
    <div className='container mt-16'>
      <div className=''>
        <h2 className='text-5xl md:text-6xl mb-12 md:leading-tight'>
          Researches across all <br /> aspects of{' '}
          <span className='italic font-garamond'>Psychedelics</span>
        </h2>
        <div className='w-full'>
          <Image
            src={imgTheEyes}
            alt='Psychedelic Database'
            className='rounded-lg w-full'
            quality={75}
          />
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        {papers.map(
          ({ id, title, authors, keywords, doi, url, publishedAt }) => {
            return (
              <div key={id}>
                <h3>{title}</h3>
                <div>
                  <h4>Authors: {authors.join(', ')}</h4>
                </div>
                <div>
                  <h4>Keywords: {keywords.join(', ')}</h4>
                </div>
                <div>
                  <h3>Source: {doi}</h3>
                </div>
                <Link href={url}>Link</Link>
                <div>
                  <h4>
                    Published At: {dayjs(publishedAt).format('MMM, YYYY')}
                  </h4>
                </div>
              </div>
            )
          },
        )}
      </div>
    </div>
  )
}

export default ResearchPage
