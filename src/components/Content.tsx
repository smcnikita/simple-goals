'use client';

import type { FC, PropsWithChildren } from 'react';

const Content: FC<PropsWithChildren> = ({ children }) => {
  return <div className="w-full">{children}</div>;
};

export default Content;
