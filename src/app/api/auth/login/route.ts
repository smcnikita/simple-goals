import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { getTranslations } from 'next-intl/server';

import { USER_ID } from '@/constants/headers';

import { SignInSchema } from '@/lib/definitions/auth';
import { prisma } from '@/lib/prisma';
import { encrypt } from '@/lib/session';
import { SessionPayload } from '@/lib/definitions/session';

export async function POST(req: Request) {
  const res = await req.json();
  const { email, password } = res;

  const t = await getTranslations('Errors');

  if (!email || !password) {
    return NextResponse.json({ message: t('emailAndPasswordRequired') }, { status: 500 });
  }

  const validatedFields = SignInSchema.safeParse({ email, password });

  if (!validatedFields.success) {
    return NextResponse.json({ errors: validatedFields.error.flatten().fieldErrors }, { status: 500 });
  }

  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user || !user.password) {
    return NextResponse.json({ message: t('invalidEmailOrPassword') }, { status: 500 });
  }

  const passwordValid = await compare(password, user.password);

  if (!passwordValid) {
    return NextResponse.json({ message: t('invalidEmailOrPassword') }, { status: 500 });
  }

  const sub: SessionPayload = {
    userId: user.id.toString(),
    name: user.name,
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

  const response = NextResponse.json(
    {
      message: t('success'),
      token,
    },
    { status: 200 }
  );

  response.cookies.set(cookieOptions);
  response.headers.set(USER_ID, user.id.toString());

  return response;
}
