'use client';

import type { FC, PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
