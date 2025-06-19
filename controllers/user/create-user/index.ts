import { getTranslations } from 'next-intl/server';

import { prisma } from '@/lib/prisma';

import { userService } from '@/services/user/user.service';

import type { Params } from './types';

export const createUser = async ({ email, name, password }: Params): Promise<string | void> => {
  const t = await getTranslations('errors');

  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (user) {
    return t('OAuth.Signup');
  }

  await userService.createUser({ email, name, password });
};
