import { PrismaClient } from '@prisma/client';

import { DESCRIPTION_SETTINGS_KEYS } from '@/constants/description-settings';

const prisma = new PrismaClient();

export const updateDescriptionSettingsForUser = async () => {
  const descriptionSettings = await prisma.descriptionSettings.findUnique({
    where: {
      value: DESCRIPTION_SETTINGS_KEYS.display_3_lines,
    },
  });

  if (!descriptionSettings) {
    console.log('There is no data on the description settings table');
    return;
  }

  const users = await prisma.users.findMany({
    where: {
      description_settings_id: null,
    },
  });

  if (users.length === 0) {
    console.log('-> Done: All users have updated their settings.');
    return;
  }

  const userIds = users.map((user) => user.id);

  console.log(`Users with IDs: ${userIds} are waiting for the user settings to be updated`);

  users.forEach(async (user) => {
    await prisma.users.update({
      where: { id: user.id },
      data: { description_settings_id: descriptionSettings.id },
    });
  });

  console.log('-> Done: All users have updated their settings.');
};
