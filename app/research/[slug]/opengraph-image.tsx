import { ImageResponse } from 'next/og'

import { getPapers } from '@/api/general'
import { PaperData } from '@/types'

export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const papers = await getPapers()
  const filterPaper = papers.find(
    (paper: PaperData) => paper.slug === params.slug,
  )

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {filterPaper.title}
      </div>
    ),
    {
      ...size,
      alt: filterPaper.title, // Exp
    },
  )
}
