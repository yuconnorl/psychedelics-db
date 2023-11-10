import React from 'react'
import Link from 'next/link'

import { ThemeProvider } from '@/components/ThemeProvider'

import './globals.css'
import { Header } from '@/components/Header'

export const metadata = {
  title: 'Payload Custom Server',
  description: 'Serve Payload alongside any front-end framework.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
