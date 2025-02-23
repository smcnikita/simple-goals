'use client';

import { useEffect, type FC } from 'react';

import { THEME_PREFIX } from '@/constants/theme';

import { getThemeFromLocalStorage } from '@/utils/updateTheme';

const ThemeProvider: FC = () => {
  useEffect(() => {
    const theme = getThemeFromLocalStorage();
    document.documentElement.classList.add(`${THEME_PREFIX}${theme}`);
  }, []);

  return null;
};

export default ThemeProvider;
