import { NextResponse } from 'next/server';

import { SignInSchema } from '@/lib/definitions/auth';
import { prisma } from '@/lib/prisma';
import { encrypt } from '@/lib/session';
import { SessionPayload } from '@/lib/definitions/session';

export async function POST(req: Request) {
  const res = await req.json();
  const { email, password } = res;

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 500 });
  }

  const validatedFields = SignInSchema.safeParse({ email, password });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return NextResponse.json({ errors: validatedFields.error.flatten().fieldErrors }, { status: 500 });
  }

  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 500 });
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
    maxAge: 168,
  };

  const response = NextResponse.json(
    {
      message: 'Success',
      token,
    },
    { status: 200 }
  );

  response.cookies.set(cookieOptions);

  return response;
}
