import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

import { PATHS } from '@/constants/paths';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */

  async redirects() {
    const nowYear = new Date().getFullYear();

    return [
      {
        source: '/',
        destination: PATHS.goals.base + PATHS.goals.slug.replace(':slug', nowYear.toString()),
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
