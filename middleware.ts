import { NextResponse } from 'next/server'
import { isEmpty } from 'lodash'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const userCookie = req.cookies.get('user')?.value
  if (isEmpty(userCookie)) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/channels/:path*']
}
