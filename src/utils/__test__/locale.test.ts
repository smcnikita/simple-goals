import { locales } from '@/i18n/config';

import { isLocale } from '../locale';

describe('isLocale', () => {
  it('should return true for valid locales', () => {
    locales.forEach((locale) => {
      expect(isLocale(locale)).toBe(true);
    });
  });

  it('should return false for invalid locales', () => {
    const invalidLocales = ['fr', 'de', 'es', 'zh', 'jp'];
    invalidLocales.forEach((locale) => {
      expect(isLocale(locale)).toBe(false);
    });
  });

  it('should return false for an empty string', () => {
    expect(isLocale('')).toBe(false);
  });

  it('should return false for a string with spaces', () => {
    expect(isLocale('en US')).toBe(false);
  });

  it('should return false for a locale in uppercase', () => {
    expect(isLocale('EN')).toBe(false);
  });

  it('should return false for a string with invalid format', () => {
    expect(isLocale('en_US')).toBe(false);
  });
});
