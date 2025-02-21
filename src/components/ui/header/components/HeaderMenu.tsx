'use client';

import { useMemo, useRef, type FC } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import { PATHS } from '@/constants/paths';

import BaseIcon, { MenuDuoIcon } from '../../icon';

import HeaderMenuItem from './HeaderMenuItem';

import classes from '../styles/header.module.css';
import classesAside from '@/components/ui/aside/styles/aside.module.css';

type Props = {
  isAuth: boolean;
};

const HeaderMenu: FC<Props> = ({ isAuth }) => {
  const t = useTranslations('NavLinks');
  const pathname = usePathname();

  const ref = useRef<HTMLButtonElement>(null);

  const nowYear = new Date().getFullYear();

  const showMenuDuo = useMemo(() => {
    return pathname.includes(PATHS.goals.base);
  }, [pathname]);

  const onToggleAside = () => {
    const aside = document.getElementById('aside');

    if (!aside || !ref || !ref.current) {
      return;
    }

    aside.classList.toggle(classesAside.aside__open);
    ref.current.classList.toggle(classes.active);
  };

  return (
    <nav className={classes.tabs}>
      {showMenuDuo && (
        <button type="button" className={classes.asideToggle} ref={ref} onClick={onToggleAside}>
          <BaseIcon>
            <MenuDuoIcon />
          </BaseIcon>
        </button>
      )}
      <HeaderMenuItem href={PATHS.home}>{t('home')}</HeaderMenuItem>
      {isAuth && (
        <HeaderMenuItem href={PATHS.goals.base + PATHS.goals.slug.replace(':slug', nowYear.toString())}>
          {t('goals')}
        </HeaderMenuItem>
      )}
    </nav>
  );
};

export default HeaderMenu;
