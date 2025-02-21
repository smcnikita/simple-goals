'use server';

import { getTranslations } from 'next-intl/server';

import { TOKEN } from '@/constants/cookies';

import { getUserIdFromToken } from '@/utils/getUserIdFromToken';

type ReturnError = {
  success: false;
  error: string;
};

type ReturnSuccess = {
  success: true;
  userId: number;
};

type Return = ReturnError | ReturnSuccess;

export const checkUserIdService = async (req: Request): Promise<Return> => {
  const cookiesStore = req.headers.get('cookie');
  const hasToken = cookiesStore?.includes(TOKEN);

  const t = await getTranslations('Errors');

  if (!cookiesStore || !hasToken) {
    return {
      success: false,
      error: t('error'),
    };
  }

  const token = cookiesStore
    .split(';')
    .find((cookie) => cookie.includes(TOKEN))
    ?.split('=')[1];

  if (!token) {
    return {
      success: false,
      error: t('error'),
    };
  }

  const userId = await getUserIdFromToken({ name: TOKEN, value: token });

  if (!userId) {
    return {
      success: false,
      error: t('error'),
    };
  }

  return {
    success: true,
    userId,
  };
};
