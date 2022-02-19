import { NextRequest, NextResponse } from 'next/server'

const signedinPages = ['/', '/playlist', '/library']
const pre = ['/signin', '/signup']

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.TUNES_ACCESS_TOKEN

  if (signedinPages.find((p) => p === pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL('/signin', req.url))
    }
  }

  if (pre.find((p) => p === pathname)) {
    if (token) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
}
