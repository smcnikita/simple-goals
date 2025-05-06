import type { Metadata } from 'next';
import localFont from 'next/font/local';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="yandex-tableau-widget" href="/tableau.json" />
      </head>

      <body className={`${notoSans.className} antialiased`}>{children}</body>
    </html>
  );
}
