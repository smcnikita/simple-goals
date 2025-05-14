export type Locale = (typeof locales)[number];

export const locales = ['en', 'ru'] as const;
export const defaultLocale: Locale = 'en';

export const localesInfo = {
  en: {
    text: 'English',
    icon: '/en.svg',
  },
  ru: {
    text: 'Русский',
    icon: '/ru.svg',
  },
} as const;
