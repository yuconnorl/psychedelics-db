import { NextApiRequest, NextApiResponse } from 'next'
import { ImageResponse } from 'next/og'

import { getPapers } from '@/api/general'
import { PaperData } from '@/types'

export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log('(req', req)
  console.log('????????????????????????????????????????????')

  // const { slug } = req.query

  console.log('(req', req)
  const papers = await getPapers()
  // const filterPaper = papers.find((paper: PaperData) => paper.slug === slug)

  // if (!filterPaper) {
  //   res.status(404).send('Paper not found')
  //   return
  // }

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
        {122}
      </div>
    ),
    {
      ...size,
    },
  )
}
