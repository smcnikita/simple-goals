import type { FC, PropsWithChildren } from 'react';

type Props = {
  size?: string;
  fill?: string;
  color?: string;
};

const BaseIcon: FC<PropsWithChildren<Props>> = ({ children, size = '24', fill = 'none', color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
    >
      {children}
    </svg>
  );
};

export default BaseIcon;
