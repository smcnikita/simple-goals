import { hash } from 'bcryptjs';

import { DESCRIPTION_SETTINGS_KEYS } from '@/constants/description-settings';

import { prisma } from '@/lib/prisma';

import { yearsService } from '@/services/years/years.service';

import type { Params } from './types';

export const createUser = async ({ email, name, password }: Params) => {
  const hashedPassword = await hash(password, 12);
  const nowYear = new Date().getFullYear();

  const user = await prisma.users.create({
    data: { email, name, password: hashedPassword },
  });

  const descriptionSettings = await prisma.descriptionSettings.findUnique({
    where: {
      value: DESCRIPTION_SETTINGS_KEYS.display_3_lines,
    },
  });

  if (!descriptionSettings) {
    return;
  }

  await yearsService.createUserYear({
    userId: user.id,
    year: nowYear,
    descriptionSettingsId: descriptionSettings.id,
  });
};
