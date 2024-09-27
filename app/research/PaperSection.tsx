import dayjs from 'dayjs'
import Link from 'next/link'

import { getPapers } from '@/api/general'
import SubstancesButtonGroup from '@/components/SubstancesButtonGroup'

const PaperSection = async (): Promise<JSX.Element> => {
  const papers = await getPapers()

  return (
    <div className='grid gap-3 grid-cols-[minmax(12rem,_0.3fr)_1fr] relative'>
      <SubstancesButtonGroup />
      <div className='flex flex-col gap-5'>
        {papers.map(
          ({ id, title, authors, keywords, doi, url, publishedAt, slug }) => {
            return (
              <Link prefetch={false} href={`/research/${slug}`} key={id}>
                <div>
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
                  <div>
                    <h4>
                      Published At: {dayjs(publishedAt).format('MMM, YYYY')}
                    </h4>
                  </div>
                </div>
              </Link>
            )
          },
        )}
      </div>
    </div>
  )
}

export default PaperSection
