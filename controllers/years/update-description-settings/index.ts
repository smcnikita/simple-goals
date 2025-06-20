import { prisma } from '@/lib/prisma';

import type { Params } from './types';

export const updateDescriptionSettings = async ({ id, userId, descriptionSettingsId }: Params) => {
  return await prisma.years.update({
    where: { id, user_id: userId },
    data: {
      description_settings_id: descriptionSettingsId,
    },
  });
};
