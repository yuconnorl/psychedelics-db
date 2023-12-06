import clsx from 'clsx'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

import './globals.css'
import CategoriedHeader from '@/components/CategoriedHeader'
import { ThemeProvider } from '@/components/ThemeProvider'
import { SITE_NAME } from '@/constants/constants'

export const metadata: Metadata = {
  metadataBase: new URL('https://psychedelics-database.vercel.app/'),
  title: {
    default: `${SITE_NAME} - The leading information hub around therapeutic and recreational usage of psychedelic compounds`,
    template: `%s - ${SITE_NAME}`,
  },
  description: '',
  openGraph: {
    title: `${SITE_NAME} - The leading information hub around therapeutic and recreational usage of psychedelic compounds`,
    description:
      'The leading information hub around therapeutic and recreational usage of psychedelic compounds',
    url: 'https://psychedelics-database.vercel.app',
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'zh-Tw',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - The leading information hub around therapeutic and recreational usage of psychedelic compounds`,
    description:
      'The leading information hub around therapeutic and recreational usage of psychedelic compounds',
    images: '/og-image.png',
  },
}

// loading local fonts
const garamond = localFont({
  src: [
    {
      path: '../public/fonts/cormorant-garamond-medium.woff2',
      weight: '500',
    },
  ],
  variable: '--font-garamond',
})

const notoTc = localFont({
  src: [
    {
      path: '../public/fonts/noto-sans-tc-regular.woff2',
      weight: '400',
    },
    {
      path: '../public/fonts/noto-sans-tc-semi-bold.woff2',
      weight: '600',
    },
  ],
  variable: '--font-noto',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <html
      lang='en'
      className={clsx(garamond.variable, notoTc.variable, 'h-full')}
    >
      <body className='relative antialiased flex flex-col min-h-[100dvh] font-noto'>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          disableTransitionOnChange
        >
          <CategoriedHeader />
          {children}
          <div id='sheet-portal-container'>
            <div></div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
