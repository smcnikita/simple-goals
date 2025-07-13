import { prisma } from '@/lib/prisma';

import type { UpdateDescriptionParams } from './types';

export const updateDescriptionSettings = async ({ id, descriptionSettingsId }: UpdateDescriptionParams) => {
  return await prisma.users.update({
    where: { id },
    data: {
      description_settings_id: descriptionSettingsId,
    },
  });
};
