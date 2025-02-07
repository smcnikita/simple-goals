import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

import localFont from 'next/font/local';

import Container from '@/components/ui/container';
import Header from '@/components/ui/header';

import './globals.css';

const jost = localFont({
  src: '../assets/Jost-Regular.woff2',
  variable: '--font-jost',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${jost.className}`}>
        <Toaster />
        <Container>
          <Header />
          {children}
        </Container>
      </body>
    </html>
  );
}
