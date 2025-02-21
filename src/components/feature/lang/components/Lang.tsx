'use client';

import type { FC } from 'react';
import { clsx } from 'clsx';
import { useLocale } from 'next-intl';

import { setUserLocale } from '@/services/locale-service';

import classes from '@/components/ui/popover/styles/popover.module.css';

const Lang: FC = () => {
  const locale = useLocale();

  return (
    <>
      <button
        type="button"
        className={clsx(classes.content_action, {
          [classes.active]: locale === 'en',
        })}
        onClick={() => {
          localStorage.lang = 'en';
          setUserLocale('en');
        }}
      >
        English
      </button>
      <button
        type="button"
        className={clsx(classes.content_action, {
          [classes.active]: locale === 'ru',
        })}
        onClick={() => {
          localStorage.lang = 'ru';
          setUserLocale('ru');
        }}
      >
        Русский
      </button>
    </>
  );
};

export default Lang;
