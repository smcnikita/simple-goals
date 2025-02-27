'use client';

import { useCallback, useEffect, useState, type FC } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { DEFAULT_APP_THEME, SUPPORTED_THEMES, THEME_PREFIX } from '@/constants/theme';

import { getThemeFromLocalStorage, removeThemeToLocalStorage, saveThemeToLocalStorage } from '@/utils/updateTheme';

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

      const userSystemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = userSystemTheme ? 'dark' : 'light';

      if (newTheme === 'system') {
        document.documentElement.classList.remove(`${THEME_PREFIX}${theme}`);

        if (systemTheme !== 'light') {
          document.documentElement.classList.add(`${THEME_PREFIX}${systemTheme}`);
        }

        setTheme('system');
        removeThemeToLocalStorage();
        return;
      }

      document.documentElement.classList.remove(`${THEME_PREFIX}${theme}`);
      document.documentElement.classList.remove(`${THEME_PREFIX}${systemTheme}`);
      document.documentElement.classList.add(`${THEME_PREFIX}${newTheme}`);

      setTheme(newTheme);
      saveThemeToLocalStorage(newTheme);
    },
    [theme]
  );

  useEffect(() => {
    const savedTheme = getThemeFromLocalStorage();
    setTheme(savedTheme ? savedTheme : 'system');
  }, [theme]);

  return (
    <>
      {SUPPORTED_THEMES.map((item) => (
        <button
          key={item}
          type="button"
          className={clsx(classes.content_action, {
            [classes.active]: item === theme,
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
