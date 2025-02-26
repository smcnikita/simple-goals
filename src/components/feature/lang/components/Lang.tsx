'use client';

import type { FC } from 'react';
import { clsx } from 'clsx';
import { useLocale, useTranslations } from 'next-intl';

import { LOCAL_STORAGE_LANG_KEY } from '@/constants/localstorage';

import { locales } from '@/i18n/config';

import { setUserLocale } from '@/services/locale-service';

import classes from '@/components/ui/popover/styles/popover.module.css';

const Lang: FC = () => {
  const locale = useLocale();
  const t = useTranslations('Lang');

  return (
    <>
      {locales.map((lang) => (
        <button
          key={lang}
          type="button"
          className={clsx(classes.content_action, {
            [classes.active]: lang === locale,
          })}
          onClick={() => {
            localStorage.setItem(LOCAL_STORAGE_LANG_KEY, lang);
            setUserLocale(lang);
          }}
        >
          {t(lang)}
        </button>
      ))}
    </>
  );
};

export default Lang;
