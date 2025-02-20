import { USER_ID } from '@/constants/headers';
import { userController } from '@/controllers/user-controller';
import { SessionPayload } from '@/lib/definitions/session';
import { prisma } from '@/lib/prisma';
import { encrypt } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

type Email = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
};

export async function POST(req: NextRequest) {
  const res = await req.json();
  const { code } = res;

  const codeStr = code as string;

  const NEXT_PUBLIC_GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

  if (!codeStr || !NEXT_PUBLIC_GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }

  const queryParams = new URLSearchParams({
    code: codeStr,
    client_id: NEXT_PUBLIC_GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
  });

  const response = await fetch(`https://github.com/login/oauth/access_token?${queryParams}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'application/json',
    },
  });

  const data = await response.json();

  if (data.error) {
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }

  const responseUser = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'application/json',
      Authorization: `Bearer ${data.access_token}`,
    },
  });

  const userData = await responseUser.json();

  if (userData.error) {
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }

  const name = userData.name;

  const responseUserEmail = await fetch('https://api.github.com/user/emails', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'application/json',
      Authorization: `Bearer ${data.access_token}`,
    },
  });

  const userDataEmail = await responseUserEmail.json();

  if (userDataEmail.error) {
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }

  const email = userDataEmail.find((email: Email) => email.primary)?.email;

  if (!email) {
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }

  const user = await userController.getUserByEmail(email);
  let userId;
  let userName = 'undefined';

  if (user) {
    userId = user.id;
    userName = user.name;
  } else {
    const now = new Date();
    const newUser = await prisma.users.create({
      data: {
        email,
        name,
        password: '',
        updated_at: now,
        created_at: now,
      },
    });

    userId = newUser.id;
    userName = newUser.name;
  }

  const sub: SessionPayload = {
    userId: userId.toString(),
    name: userName,
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
