import { prisma } from '@/lib/prisma';

import { DESCRIPTION_SETTINGS_KEYS } from '@/constants/description-settings';

import * as yearsService from '@/services/years';

import type { CreateNextResponse } from './types';

export const createNextYear = async (userId: number): CreateNextResponse => {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  const isYearExist = await yearsService.findYear(userId, nextYear);

  if (isYearExist) {
    return {
      error: 'Next year already exists',
    };
  }

  const descriptionSettings = await prisma.descriptionSettings.findUnique({
    where: {
      value: DESCRIPTION_SETTINGS_KEYS.display_3_lines,
    },
  });

  if (!descriptionSettings) {
    return {
      error: 'Description settings already exists',
    };
  }

  return await yearsService.createUserYear({
    userId,
    year: nextYear,
  });
};
