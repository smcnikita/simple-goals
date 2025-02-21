import { NextResponse } from 'next/server';

import { USER_ID, USER_NAME } from '@/constants/headers';
import { TOKEN } from '@/constants/cookies';
import { getTranslations } from 'next-intl/server';

export async function POST() {
  const t = await getTranslations('Errors');

  const response = NextResponse.json({ message: t('success') }, { status: 200 });

  response.cookies.delete(TOKEN);
  response.headers.delete(USER_ID);
  response.headers.delete(USER_NAME);

  return response;
}
