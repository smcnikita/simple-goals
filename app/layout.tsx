import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import Providers from '@/components/Providers';

import './globals.css';

const notoSans = localFont({
  src: [
    {
      path: '../assets/NotoSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/NotoSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/NotoSans-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/NotoSans-Bold.woff2',
      weight: 'bold',
      style: 'normal',
    },
  ],
  variable: '--font-noto-sans',
});

export const metadata: Metadata = {
  title: 'Simple Goals',
  description: 'An app for creating and tracking yearly goals',
  other: {
    'apple-mobile-web-app-title': 'Simple Goals',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="yandex-tableau-widget" href="/tableau.json" />
      </head>

      <NextIntlClientProvider messages={messages}>
        <Providers>
          <body className={`${notoSans.className} antialiased`}>{children}</body>
        </Providers>
      </NextIntlClientProvider>
    </html>
  );
}
