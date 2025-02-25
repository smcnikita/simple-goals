import 'server-only';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTranslations } from 'next-intl/server';

import { PATHS } from '@/constants/paths';
import { TOKEN, cookieOptions as tokenOptions } from '@/constants/cookies';
import { USER_ID, USER_NAME } from '@/constants/headers';

import { decrypt, encrypt } from '@/lib/session';
import type { SessionPayload } from '@/lib/definitions/session';

const allowPaths = new Set([PATHS.home]);
const onlyNotAuthPaths = new Set([
  PATHS.auth.signIn,
  PATHS.auth.signUp,
  PATHS.auth.oauth.github,
  PATHS.auth.oauth.yandex,
]);

async function setUserHeaders(token: string, response: NextResponse) {
  const tokenData = await decrypt(token);
  const sub = tokenData?.sub;

  if (sub) {
    const { userId, name } = JSON.parse(sub);
    const encodedName = encodeURIComponent(name);

    response.headers.set(USER_ID, userId);
    response.headers.set(USER_NAME, encodedName);
  }
}

export async function authService(request: NextRequest, response: NextResponse) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get(TOKEN)?.value;

  if (token) {
    await setUserHeaders(token, response);
  } else {
    response.headers.delete(USER_ID);
    response.headers.delete(USER_NAME);
  }

  if (allowPaths.has(pathname)) {
    return response;
  }

  if (token && onlyNotAuthPaths.has(pathname)) {
    return NextResponse.redirect(new URL(PATHS.home, request.nextUrl));
  }

  if (!token && !onlyNotAuthPaths.has(pathname)) {
    return NextResponse.redirect(new URL(PATHS.auth.signIn, request.nextUrl));
  }

  return response;
}

export async function createTokenAndAuth(userId: number, userName: string) {
  const sub: SessionPayload = {
    userId: userId.toString(),
    name: userName,
  };

  const token = await encrypt({ sub: JSON.stringify(sub) });

  const cookieOptions = {
    ...tokenOptions,
    value: token,
  };

  const newResponse = NextResponse.json({ success: true, token }, { status: 200 });

  newResponse.cookies.set(cookieOptions);
  newResponse.headers.set(USER_ID, userId.toString());

  return newResponse;
}

export async function logout() {
  const t = await getTranslations('Errors');

  const response = NextResponse.json({ message: t('success') }, { status: 200 });

  response.cookies.delete(TOKEN);
  response.headers.delete(USER_ID);
  response.headers.delete(USER_NAME);

  return response;
}
