import { NextResponse } from 'next/server';
import { USER_ID, USER_NAME } from '@/constants/headers';
import { TOKEN } from '@/constants/cookies';

export async function POST() {
  const response = NextResponse.json({ message: 'Success' }, { status: 200 });

  response.cookies.delete(TOKEN);
  response.headers.delete(USER_ID);
  response.headers.delete(USER_NAME);

  return response;
}
