import { DESCRIPTION_SETTINGS_KEYS } from '@/constants/description-settings';

import { prisma } from '@/lib/prisma';

import * as userService from '@/services/user';

export async function createUser(email: string, name: string, password: string) {
  const now = new Date();

  const descriptionSettings = (await userService.getDescriptionSettings()).find(
    (el) => el.value === DESCRIPTION_SETTINGS_KEYS.display_3_lines
  );

  return await prisma.users.create({
    data: {
      email,
      name,
      password,
      description_settings_id: descriptionSettings?.id ?? 2,
      created_at: now,
      updated_at: now,
    },
  });
}
