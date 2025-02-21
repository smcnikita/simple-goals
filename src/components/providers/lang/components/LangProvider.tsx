'use client';

import { useEffect, type FC } from 'react';
import { type Locale } from '@/i18n/config';

import { setUserLocale } from '@/services/locale-service';

const LangProvider: FC = () => {
  useEffect(() => {
    const lang: Locale = localStorage.lang;

    if (lang) {
      setUserLocale(lang);
    }
  }, []);

  return null;
};

export default LangProvider;
