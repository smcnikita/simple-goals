import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PATHS } from '@/constants/paths';

const allowPaths = [PATHS.home];
const onlyNotAuthPaths = [PATHS.auth.signIn, PATHS.auth.signUp];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const cookies = request.cookies;
  const token = cookies.get('token');

  if (allowPaths.includes(pathname)) {
    return NextResponse.next();
  }

  if (token) {
    if (onlyNotAuthPaths.includes(pathname)) {
      return NextResponse.redirect(new URL(PATHS.home, request.nextUrl));
    }
  }

  if (!token && !onlyNotAuthPaths.includes(pathname)) {
    return NextResponse.redirect(new URL(PATHS.auth.signIn, request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
