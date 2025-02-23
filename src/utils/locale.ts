import { locales, type Locale } from '@/i18n/config';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
