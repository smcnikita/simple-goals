import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

import { PATHS } from './constants/paths';

export default withAuth(
  function middleware(req) {
    const nowYear = new Date().getFullYear();
    if (req.nextUrl.pathname === PATHS.home) {
      return NextResponse.redirect(new URL(PATHS.goals.base + `/${nowYear}`, req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: PATHS.auth.signIn,
    },
  }
);

export const config = {
  matcher: ['/', '/goals/:path*'],
};
