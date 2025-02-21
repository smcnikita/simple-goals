'use client';

import { useEffect, type FC } from 'react';

const ThemeProvider: FC = () => {
  useEffect(() => {
    const theme = localStorage.theme ?? 'dark';
    document.documentElement.classList.add(`theme_${theme}`);
  }, []);

  return null;
};

export default ThemeProvider;
