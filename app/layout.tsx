import clsx from 'clsx'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import './globals.css'
import CategoriedHeader from '@/components/CategoriedHeader'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'
import { SITE_NAME, SITE_URL } from '@/constants/constants'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – The leading hub for for psychedelic therapy research, education, and clinical insights`,
    template: `%s – ${SITE_NAME}`,
  },
  description:
    'PsycheVault is the leading resource for information on the therapeutic applications of psychedelic substances, managed by the Taiwan Psychedelic Association. It offers a rich collection of research papers, in-depth insights, and comprehensive educational materials. Serving as a bridge between science and society, it fosters a deeper understanding of the profound impact psychedelics can have on mental health, personal growth, and well-being',
  openGraph: {
    title: {
      default: `${SITE_NAME} – The leading hub for for psychedelic therapy research, education, and clinical insights`,
      template: `%s – ${SITE_NAME}`,
    },
    description:
      'PsycheVault is the leading resource for information on the therapeutic applications of psychedelic substances, managed by the Taiwan Psychedelic Association. It offers a rich collection of research papers, in-depth insights, and comprehensive educational materials. Serving as a bridge between science and society, it fosters a deeper understanding of the profound impact psychedelics can have on mental health, personal growth, and well-being',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: `${SITE_NAME} – The leading hub for for psychedelic therapy research, education, and clinical insights`,
      template: `%s – ${SITE_NAME}`,
    },
    description:
      'PsycheVault is the leading resource for information on the therapeutic applications of psychedelic substances, managed by the Taiwan Psychedelic Association. It offers a rich collection of research papers, in-depth insights, and comprehensive educational materials. Serving as a bridge between science and society, it fosters a deeper understanding of the profound impact psychedelics can have on mental health, personal growth, and well-being',
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
      <body className='relative flex min-h-[100dvh] flex-col font-noto antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          disableTransitionOnChange
        >
          <CategoriedHeader />
          <NuqsAdapter>{children}</NuqsAdapter>
          <Toaster />
          <div id='sheet-portal-container'>
            <div></div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
