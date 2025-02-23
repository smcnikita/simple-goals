'use client';

import { useCallback, useEffect, useState, type FC } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { SUPPORTED_THEMES, THEME_PREFIX, DEFAULT_APP_THEME } from '@/constants/theme';

import { getThemeFromLocalStorage, saveThemeToLocalStorage } from '@/utils/updateTheme';

import type { Theme } from '@/types/theme';

import classes from '@/components/ui/popover/styles/popover.module.css';

const ThemeComponent: FC = () => {
  const t = useTranslations('Theme');

  const [theme, setTheme] = useState<Theme>(DEFAULT_APP_THEME);

  const updateTheme = useCallback(
    (newTheme: Theme) => {
      if (newTheme === theme) {
        return;
      }

      document.documentElement.classList.remove(`${THEME_PREFIX}${theme}`);
      document.documentElement.classList.add(`${THEME_PREFIX}${newTheme}`);

      setTheme(newTheme);
      saveThemeToLocalStorage(newTheme);
    },
    [theme]
  );

  useEffect(() => {
    const savedTheme = getThemeFromLocalStorage();

    if (savedTheme !== theme) {
      setTheme(savedTheme);
    }
  }, [theme]);

  return (
    <>
      {SUPPORTED_THEMES.map((item) => (
        <button
          key={item}
          type="button"
          className={clsx(classes.content_action, {
            [classes.active]: theme === item,
          })}
          onClick={() => updateTheme(item)}
        >
          {t(item)}
        </button>
      ))}
    </>
  );
};

export default ThemeComponent;
