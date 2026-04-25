import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/admin-auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /admin/dashboard routes
  if (pathname.startsWith('/admin/dashboard')) {
    const session = request.cookies.get('admin_session')?.value

    if (!session) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    try {
      await decrypt(session)
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}
