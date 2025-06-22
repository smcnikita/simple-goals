import { hash, compare } from 'bcryptjs';

import type { BaseResponse } from '@/types/base-controller.type';
import { prisma } from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';

export const updatePassword = async (
  userId: number,
  password: string,
  oldPassword: string
): Promise<BaseResponse<null>> => {
  const t = await getTranslations('errors');

  const user = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return {
      status: 'error',
      message: t('user_not_found'),
    };
  }

  const isPasswordValid = await compare(oldPassword, user.password);

  if (!isPasswordValid) {
    return { status: 'error', message: t('password.invalid_current_password') };
  }

  if (oldPassword === password) {
    return { status: 'error', message: t('password.new_password_and_old') };
  }

  const hashedPassword = await hash(password, 12);

  await prisma.users.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  return {
    status: 'success',
    data: null,
  };
};
