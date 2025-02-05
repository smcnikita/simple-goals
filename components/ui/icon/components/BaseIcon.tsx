import type { FC, PropsWithChildren } from 'react';

type Props = {
  size?: string;
  fill?: string;
};

const BaseIcon: FC<PropsWithChildren<Props>> = ({ children, size = '24', fill = 'none' }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
};

export default BaseIcon;
