import React from 'react'
import type { Metadata } from 'next'

import './globals.css'
import Header from '@/components/Header'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  // metadataBase: new URL('https://terminal-420.space'),
  title: {
    default: 'Psychedelic Database',
    template: '%s - Psychedelic DB',
  },
  description: 'Welcome to Psychedelic DB',
  // openGraph: {
  //   title: 'Terminal 420',
  //   description: 'Terminal 420, a place of cannabis and web tech',
  //   url: 'https://terminal-420.space',
  //   siteName: 'Terminal 420',
  //   images: [
  //     {
  //       url: 'https://terminal-420.space/images/og.jpeg',
  //       width: 1200,
  //       height: 630,
  //     },
  //   ],
  //   locale: 'zh-Tw',
  //   type: 'website',
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Terminal 420',
  //   description: 'Terminal 420, a place of cannabis and web tech',
  //   images: 'https://terminal-420.space/images/og.jpeg',
  // },
  // robots: {
  //   index: true,
  //   follow: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     'max-video-preview': -1,
  //     'max-image-preview': 'large',
  //     'max-snippet': -1,
  //   },
  // },
  // icons: {
  //   shortcut: '/favicon.png',
  // },
}

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
