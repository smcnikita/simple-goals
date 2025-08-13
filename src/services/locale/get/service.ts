'use server';

import { cookies } from 'next/headers';

import { Locale, defaultLocale } from '@/i18n/config';

import { COOKIE_NAME } from '@/constants/locale';

export async function getUserLocale(): Promise<Locale> {
  const cookiesStore = await cookies();
  return (cookiesStore.get(COOKIE_NAME)?.value as Locale) || defaultLocale;
}
