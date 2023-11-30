import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log('middleware fire')

  // if (request.nextUrl.pathname.startsWith('/database')) {
  //   return NextResponse.rewrite(
  //     new URL('/database/psychedelics-fundamentals', request.url),
  //   )
  // }

  // return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/database/:path*',
}
