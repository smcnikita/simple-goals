'use server';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { PATHS } from '@/constants/paths';
import { TOKEN } from '@/constants/cookies';

const allowPaths = [PATHS.home];
const onlyNotAuthPaths = [PATHS.auth.signIn, PATHS.auth.signUp];

export function authService(request: NextRequest, response: NextResponse) {
  const pathname = request.nextUrl.pathname;
  const cookies = request.cookies;
  const token = cookies.get(TOKEN);

  if (allowPaths.includes(pathname)) {
    return response;
  }

  if (token) {
    if (onlyNotAuthPaths.includes(pathname)) {
      return NextResponse.redirect(new URL(PATHS.home, request.nextUrl));
    }
  }

  if (!token && !onlyNotAuthPaths.includes(pathname)) {
    return NextResponse.redirect(new URL(PATHS.auth.signIn, request.nextUrl));
  }

  return response;
}
