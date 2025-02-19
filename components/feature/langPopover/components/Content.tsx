'use client';

import type { FC } from 'react';
import { clsx } from 'clsx';
import { useLocale, useTranslations } from 'next-intl';

import { setUserLocale } from '@/services/locale-service';

import classes from '@/components/ui/popover/styles/popover.module.css';

const Content: FC = () => {
  const tLang = useTranslations('Lang');
  const locale = useLocale();

  return (
    <div className={classes.content_wrapper}>
      <p className={classes.content_title}>{tLang('lang')}</p>

      <button
        type="button"
        className={clsx(classes.content_action, {
          [classes.active]: locale === 'en',
        })}
        onClick={() => {
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
          setUserLocale('ru');
        }}
      >
        Русский
      </button>
    </div>
  );
};

export default Content;
