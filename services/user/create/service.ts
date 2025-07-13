import { hash } from 'bcryptjs';
import { getTranslations } from 'next-intl/server';

import { DESCRIPTION_SETTINGS_KEYS } from '@/constants/description-settings';

import { prisma } from '@/lib/prisma';

import * as yearsService from '@/services/years';

import type { CreateParams } from './types';
import type { BaseResponse } from '@/types/base-controller.type';

export const createUser = async ({ email, name, password }: CreateParams): Promise<BaseResponse<null>> => {
  const t = await getTranslations('errors');

  const descriptionSettings = await prisma.descriptionSettings.findUnique({
    where: {
      value: DESCRIPTION_SETTINGS_KEYS.display_3_lines,
    },
  });

  if (!descriptionSettings) {
    return {
      status: 'error',
      message: t('OAuth.Signup'),
    };
  }

  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (user) {
    return {
      status: 'error',
      message: t('OAuth.Signup'),
    };
  }

  const hashedPassword = await hash(password, 12);
  const nowYear = new Date().getFullYear();

  const newUser = await prisma.users.create({
    data: { email, name, password: hashedPassword, description_settings_id: descriptionSettings.id },
  });

  const createUserYearService = await yearsService.createUserYear({
    userId: newUser.id,
    year: nowYear,
  });

  if (createUserYearService.status === 'error') {
    return {
      status: 'error',
      message: createUserYearService.message,
    };
  }

  return {
    status: 'success',
    data: null,
  };
};
