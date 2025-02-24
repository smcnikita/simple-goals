'use client';

import { PATHS } from '@/constants/paths';
import { httpLogout } from '@/lib/http/auth';
import toast from 'react-hot-toast';

export const logoutClient = async (error: string) => {
  try {
    const res = await httpLogout();

    if (!res.ok) {
      toast.error(error);
      return;
    }
  } finally {
    localStorage.removeItem('latestCSRFToken');
    window.location.href = PATHS.auth.signIn;
  }
};
