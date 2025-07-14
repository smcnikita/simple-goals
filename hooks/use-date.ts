'use client';

import { useLocale } from 'next-intl';
import { useMemo } from 'react';

const useDate = (date: string | null | undefined) => {
  const locale = useLocale();

  const getLocaleKey = useMemo<Intl.LocalesArgument>(() => {
    return locale === 'en' ? 'en-US' : 'ru-RU';
  }, [locale]);

  const transformDate = useMemo(() => {
    if (!date) {
      return null;
    }

    const dateObj = new Date(date);
    return dateObj.toLocaleDateString(getLocaleKey, {
      month: 'long',
      day: 'numeric',
    });
  }, [getLocaleKey, date]);

  return { transformDate };
};

export default useDate;
