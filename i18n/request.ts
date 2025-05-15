import { getRequestConfig } from 'next-intl/server';

import { localeService } from '@/services/locale/locale.service';

export default getRequestConfig(async () => {
  const locale = await localeService.getUserLocale();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
