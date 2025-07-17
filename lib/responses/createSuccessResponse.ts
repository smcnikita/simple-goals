import { NextResponse } from 'next/server';

export type NextResponseTypeItem<T> = { message: 'Success'; data: T };

export type NextResponseType<T> = NextResponse<NextResponseTypeItem<T>>;

export function createSuccessResponse<T>(data: T): NextResponseType<T> {
  return NextResponse.json({ message: 'Success', data }, { status: 200 });
}
