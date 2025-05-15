import { NextResponse } from 'next/server';

type NextResponseType<T> = NextResponse<{
  message: 'Success';
  data: T;
}>;

export function createSuccessResponse<T>(data: T): NextResponseType<T> {
  return NextResponse.json({ message: 'Success', data }, { status: 200 });
}
