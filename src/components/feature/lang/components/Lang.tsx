'use client';

import type { FC } from 'react';
import { clsx } from 'clsx';
import { useLocale, useTranslations } from 'next-intl';

import { LOCAL_STORAGE_LANG_KEY } from '@/constants/localstorage';

import { locales } from '@/i18n/config';

import { setUserLocale } from '@/services/locale-service';

import BaseIcon, { USIcon, RussiaIcon } from '@/components/ui/icon';

import classes from '@/components/ui/popover/styles/popover.module.css';

const Lang: FC = () => {
  const locale = useLocale();
  const t = useTranslations('Lang');

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
      {locales.map((lang) => (
        <button
          key={lang}
          type="button"
          style={{ justifyContent: 'center' }}
          className={clsx(classes.content_action, {
            [classes.active]: lang === locale,
          })}
          aria-label={t(lang)}
          onClick={() => {
            localStorage.setItem(LOCAL_STORAGE_LANG_KEY, lang);
            setUserLocale(lang);
          }}
        >
          <BaseIcon viewBox="0 0 512 512" size="16">
            {lang === 'en' && <USIcon />}
            {lang === 'ru' && <RussiaIcon />}
          </BaseIcon>
        </button>
      ))}
    </div>
  );
};

export default Lang;
