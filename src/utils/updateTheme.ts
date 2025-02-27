import { THEME_STORAGE_KEY } from '@/constants/theme';

import type { Theme } from '@/types/theme';

export const saveThemeToLocalStorage = (theme: Theme) => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

export const removeThemeToLocalStorage = () => {
  localStorage.removeItem(THEME_STORAGE_KEY);
};

export const getThemeFromLocalStorage = (): Theme | null => {
  return localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
};
