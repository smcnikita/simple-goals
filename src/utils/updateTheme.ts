import { THEME_KEY } from '@/constants/localstorage';

import type { Theme } from '@/types/theme';

export const updateThemeInLocalstorage = (theme: Theme) => {
  localStorage.setItem(THEME_KEY, theme);
};

export const getThemeFromLocalstorage = () => {
  return localStorage.getItem(THEME_KEY) as Theme;
};
