'use client';

import { Suspense, type FC, lazy } from 'react';

const YandexMetrika = lazy(() => import('./YandexMetrika'));

const analyticsConfig = [
  {
    name: 'YandexMetrika',
    enabled: process.env.NEXT_PUBLIC_USE_YANDEX_METRIKA === 'true',
    component: YandexMetrika,
  },
];

const AnalyticsInitializer: FC = () => {
  return (
    <>
      {analyticsConfig.map(
        ({ enabled, component: Component }, index) =>
          enabled && (
            <Suspense key={index} fallback={null}>
              <Component />
            </Suspense>
          )
      )}
    </>
  );
};

export default AnalyticsInitializer;
