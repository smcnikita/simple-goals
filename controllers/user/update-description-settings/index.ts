import { prisma } from '@/lib/prisma';

import type { Params } from './types';

export const updateDescriptionSettings = async ({ id, descriptionSettingsId }: Params) => {
  return await prisma.users.update({
    where: { id },
    data: {
      description_settings_id: descriptionSettingsId,
    },
  });
};
