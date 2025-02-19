'use client';

import type { FC } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';

import { PATHS } from '@/constants/paths';

import { httpLogout } from '@/lib/http/auth';

import BaseIcon, { ExitIcon } from '@/components/ui/icon';
// import ThemeComponent from './Theme';

import classes from '../styles/popover.module.css';

type Props = {
  className?: string;
};

const UserPopoverContent: FC<Props> = ({ className }) => {
  const logout = async () => {
    const res = await httpLogout();

    if (!res.ok) {
      toast.error('Something went wrong');
      return;
    }

    window.location.href = PATHS.auth.signIn;
  };

  return (
    <div className={clsx(classes.content, className)}>
      {/* <p className={classes.content_title}>Themes</p> */}
      {/* <ThemeComponent /> */}

      <p className={classes.content_title}>Exit</p>

      <button type="button" className={classes.content_action} onClick={() => logout()}>
        <BaseIcon>
          <ExitIcon />
        </BaseIcon>
        Exit
      </button>
    </div>
  );
};

export default UserPopoverContent;
