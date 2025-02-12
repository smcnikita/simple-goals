'use client';

import { useEffect, useState, type FC } from 'react';

import BaseIcon, { SunIcon, MoonIcon } from '@/components/ui/icon';

import { getThemeFromLocalstorage, updateThemeInLocalstorage } from '@/utils/updateTheme';

import type { Theme } from '@/types/theme';

import classes from '@/components/ui/header/styles/header.module.css';

const ThemeComponent: FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  const updateTheme = (selectedTheme: Theme) => {
    if (selectedTheme === 'light') {
      setTheme('light');
      document.documentElement.classList.add('theme_light');
      document.documentElement.classList.remove('theme_dark');
      updateThemeInLocalstorage('light');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('theme_dark');
      document.documentElement.classList.remove('theme_light');
      updateThemeInLocalstorage('dark');
    }
  };

  useEffect(() => {
    const theme = getThemeFromLocalstorage();
    updateTheme(theme);
  }, []);

  return (
    <button type="button" className={classes.tab} onClick={() => updateTheme(theme === 'light' ? 'dark' : 'light')}>
      <BaseIcon color="white">{theme === 'light' ? <MoonIcon /> : <SunIcon />}</BaseIcon>
    </button>
  );
};

export default ThemeComponent;
