import clsx from 'clsx'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

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

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <html lang="en" className={clsx(garamond.variable, 'antialiased')}>
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
