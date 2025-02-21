import { NextRequest, NextResponse } from 'next/server';

import { USER_ID } from '@/constants/headers';

import type { SessionPayload } from '@/lib/definitions/session';

import { prisma } from '@/lib/prisma';
import { encrypt } from '@/lib/session';

import { userController } from '@/controllers/user-controller';

export async function POST(req: NextRequest) {
  const res = await req.json();
  const { code } = res;

  const codeStr = code as string;

  const NEXT_PUBLIC_YANDEX_CLIENT_ID = process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID;
  const YANDEX_CLIENT_SECRET = process.env.YANDEX_CLIENT_SECRET;

  if (!codeStr || !NEXT_PUBLIC_YANDEX_CLIENT_ID || !YANDEX_CLIENT_SECRET) {
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }

  // const queryParams = new URLSearchParams({
  //   code: codeStr,
  //   client_id: NEXT_PUBLIC_YANDEX_CLIENT_ID,
  //   client_secret: YANDEX_CLIENT_SECRET,
  // });

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', codeStr);

  const response = await fetch('https://oauth.yandex.ru/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(`${NEXT_PUBLIC_YANDEX_CLIENT_ID}:${YANDEX_CLIENT_SECRET}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  const data = await response.json();

  if (data.error) {
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }

  const responseUser = await fetch('https://login.yandex.ru/info', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + data.access_token,
    },
  });

  const dataUser = await responseUser.json();

  if (dataUser.error) {
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }

  const name = dataUser.real_name;
  const email = dataUser.default_email;

  let userId;

  const user = await userController.getUserByEmail(email);

  if (user) {
    userId = user.id;
  } else {
    const now = new Date();

    const newUser = await prisma.users.create({
      data: {
        email,
        name,
        password: 'no-password-yandex',
        updated_at: now,
        created_at: now,
      },
    });

    userId = newUser.id;
  }

  const sub: SessionPayload = {
    userId: userId.toString(),
    name,
  };

  const token = await encrypt({ sub: JSON.stringify(sub) });

  const cookieOptions = {
    name: 'token',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 7 * 24 * 60 * 60,
  };

  const newResponse = NextResponse.json({ success: true, token }, { status: 200 });

  newResponse.cookies.set(cookieOptions);
  newResponse.headers.set(USER_ID, userId.toString());

  return newResponse;
}
