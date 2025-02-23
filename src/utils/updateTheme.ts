import { DEFAULT_APP_THEME, THEME_STORAGE_KEY } from '@/constants/theme';

import type { Theme } from '@/types/theme';

export const saveThemeToLocalStorage = (theme: Theme) => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

export const getThemeFromLocalStorage = (): Theme => {
  return (localStorage.getItem(THEME_STORAGE_KEY) as Theme | null) ?? DEFAULT_APP_THEME;
};
