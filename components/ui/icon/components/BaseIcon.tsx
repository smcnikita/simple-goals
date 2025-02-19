import type { FC, PropsWithChildren } from 'react';

type Props = {
  size?: string;
  fill?: string;
  color?: string;
  viewBox?: string;
};

const BaseIcon: FC<PropsWithChildren<Props>> = ({
  children,
  size = '24',
  fill = 'none',
  color,
  viewBox = '0 0 24 24',
}) => {
  return (
    <svg width={size} height={size} viewBox={viewBox} fill={fill} xmlns="http://www.w3.org/2000/svg" style={{ color }}>
      {children}
    </svg>
  );
};

export default BaseIcon;
