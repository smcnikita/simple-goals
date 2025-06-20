import { DESCRIPTION_SETTINGS_KEYS } from '@/constants/description-settings';

export type DescriptionSettingsKeys = (typeof DESCRIPTION_SETTINGS_KEYS)[keyof typeof DESCRIPTION_SETTINGS_KEYS];

export type DescriptionSettings = {
  id: number;
  value: DescriptionSettingsKeys;
};
