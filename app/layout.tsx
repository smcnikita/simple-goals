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
  other: {
    'apple-mobile-web-app-title': 'Simple Goals',
  },
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
