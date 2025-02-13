'use client';

import { useEffect, useState, type FC } from 'react';
import clsx from 'clsx';

import BaseIcon, { SunIcon, MoonIcon } from '@/components/ui/icon';

import { getThemeFromLocalstorage, updateThemeInLocalstorage } from '@/utils/updateTheme';

import type { Theme } from '@/types/theme';

import classes from '../styles/popover.module.css';

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
    <>
      <button
        type="button"
        className={clsx(classes.content_action, {
          [classes.active]: theme === 'light',
        })}
        onClick={() => updateTheme('light')}
      >
        <BaseIcon color="white">
          <SunIcon />
        </BaseIcon>
        Light theme
      </button>
      <button
        type="button"
        className={clsx(classes.content_action, {
          [classes.active]: theme === 'dark',
        })}
        onClick={() => updateTheme('dark')}
      >
        <BaseIcon color="white">
          <MoonIcon />
        </BaseIcon>
        Dark theme
      </button>
    </>
  );
};

export default ThemeComponent;
