'use client';

import { useEffect, useState, type FC } from 'react';
import clsx from 'clsx';

import { getThemeFromLocalstorage, updateThemeInLocalstorage } from '@/utils/updateTheme';

import type { Theme } from '@/types/theme';

import classes from '@/components/ui/popover/styles/popover.module.css';

const ThemeComponent: FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  const themes = ['light', 'dark'] as Theme[];

  const updateTheme = (value: Theme | null) => {
    const selectedTheme = value ?? 'dark';
    const classList = document.documentElement.classList;

    classList.forEach((el) => {
      if (el.includes('theme_')) {
        document.documentElement.classList.remove(el);
      }
    });

    document.documentElement.classList.add(`theme_${selectedTheme}`);

    setTheme(selectedTheme);
    updateThemeInLocalstorage(selectedTheme);
  };

  useEffect(() => {
    const theme = getThemeFromLocalstorage();
    updateTheme(theme);
  }, []);

  return (
    <>
      {themes.map((el) => (
        <button
          key={el}
          type="button"
          className={clsx(classes.content_action, {
            [classes.active]: theme === el,
          })}
          onClick={() => updateTheme(el)}
        >
          {el.charAt(0).toUpperCase() + el.slice(1)} theme
        </button>
      ))}
    </>
  );
};

export default ThemeComponent;
