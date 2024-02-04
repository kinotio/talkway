import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const userCookie = req.cookies.get('__user')?.value
  const tokenCookie = req.cookies.get('__token')?.value
  if (userCookie === undefined || tokenCookie === undefined) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/channels/:path*']
}
