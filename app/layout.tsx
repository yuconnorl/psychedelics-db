import clsx from 'clsx'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import './globals.css'
import CategoriedHeader from '@/components/CategoriedHeader'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'
import {
  SITE_META_KEYWORDS,
  SITE_NAME,
  SITE_NAME_ZH,
  SITE_URL,
} from '@/constants/constants'

const siteDescription = `${SITE_NAME_ZH} ${SITE_NAME} 致力於推廣啟靈物質的研究、治療與應用。平台收錄研究論文、教育資源與專業見解，旨在推動大眾深入理解啟靈藥物對心理健康、個人成長與社會福祉的正向影響。本資料庫由台灣啟靈意識研究學會維護與管理。`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  keywords: SITE_META_KEYWORDS,
  title: {
    default: `${SITE_NAME_ZH} ${SITE_NAME}`,
    template: `%s – ${SITE_NAME_ZH} ${SITE_NAME}`,
  },
  description: siteDescription,
  openGraph: {
    title: {
      default: `${SITE_NAME_ZH} ${SITE_NAME} – 通往啟靈研究與知識的大門`,
      template: `%s – ${SITE_NAME_ZH} ${SITE_NAME}`,
    },
    description: siteDescription,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: `${SITE_NAME_ZH} ${SITE_NAME} – 通往啟靈研究與知識的大門`,
      template: `%s – ${SITE_NAME_ZH} ${SITE_NAME}`,
    },
    description: siteDescription,
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
    <html
      lang='zh-TW'
      suppressHydrationWarning
      className={clsx(garamond.variable)}
    >
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
