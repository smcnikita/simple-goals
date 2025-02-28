import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { getServerSession } from 'next-auth/next';

import Container from '@/components/ui/container';
import Header from '@/components/ui/header';

import { ThemeInitializer } from '@/components/feature/theme';
import { LangInitializer } from '@/components/feature/lang';
import { AnalyticsInitializer } from '@/components/feature/analytics';
import Providers from '@/components/feature/providers';

import '../assets/styles/globals.css';
import '../assets/styles/colors/light.css';
import '../assets/styles/colors/dark.css';
import { authOptions } from '@/lib/auth';

const jost = localFont({
  src: [
    {
      path: '../assets/Jost-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/Jost-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-jost',
});

export const metadata: Metadata = {
  title: 'Simple Goals',
  description: 'An app for creating and tracking yearly goals',
  other: {
    'apple-mobile-web-app-title': 'Simple Goals',
  },
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();
  const messages = await getMessages();

  const session = await getServerSession(authOptions);

  const isAuth = !!session;

  return (
    <html lang={locale}>
      <head>
        <link rel="yandex-tableau-widget" href="/tableau.json" />
      </head>

      <ThemeInitializer />
      <LangInitializer />

      <NextIntlClientProvider messages={messages}>
        <Providers>
          <body className={`${jost.className}`}>
            <div id="global-app">
              <Toaster />

              <Container>
                <Header isAuth={isAuth} />
                {children}
              </Container>

              <AnalyticsInitializer />
            </div>
          </body>
        </Providers>
      </NextIntlClientProvider>
    </html>
  );
}
