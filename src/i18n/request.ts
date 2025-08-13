import { getRequestConfig } from 'next-intl/server';

import * as localeService from '@/services/locale';

export default getRequestConfig(async () => {
  const locale = await localeService.getUserLocale();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
