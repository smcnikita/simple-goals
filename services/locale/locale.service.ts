'use server';

import { getUserLocale } from './get-user-locale';
import { setUserLocale } from './set-user-locale';

export const localeService = {
  getUserLocale,
  setUserLocale,
};
