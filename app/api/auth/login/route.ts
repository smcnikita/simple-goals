import { NextResponse } from 'next/server';

import { SignInSchema } from '@/lib/definitions/auth';

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

  return NextResponse.json({ message: 'Success', email }, { status: 200 });
}
