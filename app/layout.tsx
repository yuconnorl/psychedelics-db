import clsx from 'clsx'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import './globals.css'
import CategoriedHeader from '@/components/CategoriedHeader'
import { ThemeProvider } from '@/components/ThemeProvider'
import { SITE_NAME, SITE_URL } from '@/constants/constants'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - The leading information hub around therapeutic and recreational usage of psychedelic compounds`,
    template: `%s - ${SITE_NAME}`,
  },
  description:
    'Psychedelics database is the leading information hub around therapeutic and recreational usage of psychedelic compounds, managed by the Taiwan Psychedelic Collective',
  openGraph: {
    title: {
      default: `${SITE_NAME} - The leading information hub around therapeutic and recreational usage of psychedelic compounds`,
      template: `%s - ${SITE_NAME}`,
    },
    description:
      'The leading information hub around therapeutic and recreational usage of psychedelic compounds',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: `${SITE_NAME} - The leading information hub around therapeutic and recreational usage of psychedelic compounds`,
      template: `%s - ${SITE_NAME}`,
    },
    description:
      'The leading information hub around therapeutic and recreational usage of psychedelic compounds',
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

// const notoTc = localFont({
//   src: [
//     {
//       path: '../public/fonts/noto-sans-tc-regular.woff2',
//       weight: '400',
//     },
//     {
//       path: '../public/fonts/noto-sans-tc-semi-bold.woff2',
//       weight: '600',
//     },
//   ],
//   variable: '--font-noto',
// })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <html lang='en' className={clsx(garamond.variable)}>
      <body className='relative antialiased flex flex-col min-h-[100dvh] font-noto'>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          disableTransitionOnChange
        >
          <CategoriedHeader />
          <NuqsAdapter>{children}</NuqsAdapter>
          <div id='sheet-portal-container'>
            <div></div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
