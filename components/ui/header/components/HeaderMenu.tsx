import type { FC } from 'react';

import { PATHS } from '@/constants/paths';

import HeaderMenuItem from './HeaderMenuItem';

import classes from '../styles/header.module.css';

const nowYear = new Date().getFullYear();
const menuList = [
  { name: 'Home', href: PATHS.home },
  { name: 'Goals', href: PATHS.goals.base + PATHS.goals.slug.replace(':slug', nowYear.toString()) },
];

const HeaderMenu: FC = () => {
  return (
    <nav className={classes.tabs}>
      {menuList.map((el) => (
        <HeaderMenuItem key={el.name} href={el.href}>
          {el.name}
        </HeaderMenuItem>
      ))}
    </nav>
  );
};

export default HeaderMenu;
