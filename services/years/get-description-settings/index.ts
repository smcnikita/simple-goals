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
  const t = await getTranslations('settings.comment.options');

  const descriptionSettings = await prisma.descriptionSettings.findUnique({
    where: { id },
  });

  return {
    id: descriptionSettings?.id ?? 0,
    value: (t(descriptionSettings?.value as DescriptionSettingsKeys) as DescriptionSettingsKeys) ?? 'display_none',
  };
};

export const getDescriptionSettingsValueByKey = async (key: DescriptionSettingsKeys): Promise<string> => {
  const t = await getTranslations('settings.comment.options');
  return t(key);
};
