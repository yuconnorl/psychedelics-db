import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
  // Font
  // const interSemiBold = fetch(
  //   new URL('./Inter-SemiBold.ttf', import.meta.url),
  // ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
      <div
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'white',
        }}
      >
        <div tw='flex flex-col'>
          <div>Research</div>
          <div>Psychedelic Database</div>
        </div>
      </div>
    ),
    {
      ...size,
      // fonts: [
      //   {
      //     name: 'Inter',
      //     data: await interSemiBold,
      //     style: 'normal',
      //     weight: 400,
      //   },
      // ],
    },
  )
}
