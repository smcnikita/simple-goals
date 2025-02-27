'use client';

import { useEffect, type FC } from 'react';

import { THEME_PREFIX } from '@/constants/theme';

import { getThemeFromLocalStorage } from '@/utils/updateTheme';

const ThemeInitializer: FC = () => {
  useEffect(() => {
    const theme = getThemeFromLocalStorage();

    if (theme) {
      document.documentElement.classList.add(`${THEME_PREFIX}${theme}`);
    } else {
      const userSystemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = userSystemTheme ? 'dark' : 'light';

      document.documentElement.classList.add(`${THEME_PREFIX}${systemTheme}`);
    }
  }, []);

  return null;
};

export default ThemeInitializer;
