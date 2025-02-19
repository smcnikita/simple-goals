import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';

import { TOKEN } from '@/constants/cookies';
import { USER_ID } from '@/constants/headers';

import ThemeProvider from '@/components/providers/theme';

import Container from '@/components/ui/container';
import Header from '@/components/ui/header';

import '../assets/styles/globals.css';
import '../assets/styles/colors/dark.css';

const jost = localFont({
  src: '../assets/Jost-Regular.woff2',
  variable: '--font-jost',
});

export const metadata: Metadata = {
  title: 'Simple Goals',
  description: 'An app for creating and tracking yearly goals',

  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/76x76.png',
      sizes: '76x76',
    },
    {
      rel: 'apple-touch-icon',
      url: '/120x120.png',
      sizes: '120x120',
    },
    {
      rel: 'apple-touch-icon',
      url: '/152x152.png',
      sizes: '152x152',
    },
    {
      rel: 'apple-touch-icon',
      url: '/180x180.png',
      sizes: '180x180',
    },

    {
      rel: 'shortcut icon',
      url: '/16x16.png',
      sizes: '16x16',
    },
    {
      rel: 'shortcut icon',
      url: '/32x32.png',
      sizes: '32x32',
    },
    {
      rel: 'shortcut icon',
      url: '/192x192.png',
      sizes: '192x192',
    },
  ],
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: Props) {
  const cookiesStore = await cookies();
  const headersStore = await headers();

  const token = cookiesStore.get(TOKEN);
  const userId = headersStore.get(USER_ID);

  const isAuth = !!token && !!userId;

  return (
    <html lang="en">
      <ThemeProvider />
      <body className={`${jost.className}`}>
        <Toaster />
        <Container>
          <Header isAuth={isAuth} />
          {children}
        </Container>
      </body>
    </html>
  );
}
