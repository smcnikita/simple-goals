'use server';

import { cookies } from 'next/headers';

import { Locale } from '@/i18n/config';

import { COOKIE_NAME } from '@/constants/locale';

export async function setUserLocale(locale: Locale) {
  const cookiesStore = await cookies();
  cookiesStore.set(COOKIE_NAME, locale);
}
