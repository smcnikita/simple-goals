'use server';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { PATHS } from '@/constants/paths';
import { TOKEN } from '@/constants/cookies';

import { decrypt } from '@/lib/session';
import { USER_ID, USER_NAME } from '@/constants/headers';

const allowPaths = [PATHS.home];
const onlyNotAuthPaths = [PATHS.auth.signIn, PATHS.auth.signUp, PATHS.auth.github];

export async function authService(request: NextRequest, response: NextResponse) {
  const pathname = request.nextUrl.pathname;
  const cookies = request.cookies;
  const token = cookies.get(TOKEN);

  if (token) {
    const tokenData = await decrypt(token.value);
    const sub = tokenData?.sub;

    if (sub) {
      const { userId, name } = JSON.parse(sub);
      response.headers.set(USER_ID, userId);
      response.headers.set(USER_NAME, name);
    }
  } else {
    response.headers.delete(USER_ID);
    response.headers.delete(USER_NAME);
  }

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
