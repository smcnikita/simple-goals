'use client';

import { useEffect, type FC, type PropsWithChildren } from 'react';

import { useThemeStore } from '@/stores/theme-store';

import type { Theme } from '@/types/theme.types';

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { updateTheme } = useThemeStore();

  useEffect(() => {
    const theme = localStorage.getItem('theme') as Theme | undefined;

    if (theme) {
      updateTheme(theme);
      return;
    }

    updateTheme('system');
  }, [updateTheme]);

  return <>{children}</>;
};

export default ThemeProvider;
