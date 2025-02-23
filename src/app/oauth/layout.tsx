import type { FC, PropsWithChildren } from 'react';

const OAuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--body-color)',
        background: 'var(--body-background)',
        zIndex: 99999,
        opacity: 1,
      }}
    >
      {children}
    </div>
  );
};

export default OAuthLayout;
