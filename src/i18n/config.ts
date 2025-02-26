export type Locale = (typeof locales)[number];

export const locales = ['ru', 'en'] as const;
export const defaultLocale: Locale = 'ru';
