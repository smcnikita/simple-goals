import { prisma } from '@/lib/prisma';

import { DESCRIPTION_SETTINGS_KEYS } from '@/constants/description-settings';

import { yearsService } from '@/services/years/years.service';

export const findOrCreate = async (userId: number) => {
  const descriptionSettings = await prisma.descriptionSettings.findUnique({
    where: {
      value: DESCRIPTION_SETTINGS_KEYS.display_3_lines,
    },
  });

  if (!descriptionSettings) {
    return;
  }

  return await yearsService.findOrCreate({ userId });
};
