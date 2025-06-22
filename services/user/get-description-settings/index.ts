import { prisma } from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';

import type { DescriptionSettings, DescriptionSettingsKeys } from '@/types/description-settings.type';

export const getDescriptionSettings = async (): Promise<DescriptionSettings[]> => {
  return (await prisma.descriptionSettings.findMany()).map((el) => ({
    ...el,
    value: el.value as DescriptionSettingsKeys,
  }));
};

export const getDescriptionSettingsById = async (id: number): Promise<DescriptionSettings | undefined> => {
  const descriptionSettings = await prisma.descriptionSettings.findUnique({
    where: { id },
  });

  return {
    id: descriptionSettings?.id ?? 0,
    value: (descriptionSettings?.value as DescriptionSettingsKeys) ?? 'display_none',
  };
};

export const getDescriptionSettingsValueByKey = async (key: DescriptionSettingsKeys): Promise<string> => {
  const t = await getTranslations('settings.comment.options');
  return t(key);
};

export const getUserDescriptionSettings = async (userId: number) => {
  const user = await prisma.users.findUnique({
    where: { id: userId },
    omit: {
      id: true,
      description_settings_id: false,
      created_at: true,
      email: true,
      name: true,
      password: true,
      updated_at: true,
    },
  });

  if (user && user.description_settings_id) {
    return getDescriptionSettingsById(user.description_settings_id);
  }
};
