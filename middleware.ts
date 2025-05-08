import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const nowYear = new Date().getFullYear();

    if (req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/goals' + `/${nowYear}`, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/sign-in',
    },
  }
);

export const config = {
  matcher: ['/', '/goals/:path*'],
};
