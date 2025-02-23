'use client';

import { useEffect, type FC } from 'react';

import { setUserLocale } from '@/services/locale-service';

import { isLocale } from '@/utils/locale';

const LangInitializer: FC = () => {
  useEffect(() => {
    const lang = localStorage.getItem('lang');

    if (lang && isLocale(lang)) {
      setUserLocale(lang);
    }
  }, []);

  return null;
};

export default LangInitializer;
