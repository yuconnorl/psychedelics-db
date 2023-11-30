import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { DEFAULT_LAYOUT } from '@/config/general'

export const middleware = (req: NextRequest) => {
  const { pathname } = req.nextUrl
  const { search } = req.nextUrl

  if (
    pathname.startsWith('/database') &&
    pathname.split('/').length === 3 &&
    search === ''
  ) {
    req.nextUrl.search = `?layout=${DEFAULT_LAYOUT}`
    return NextResponse.redirect(req.nextUrl)
  }
}

export const config = {
  matcher: '/database/:path*',
}
