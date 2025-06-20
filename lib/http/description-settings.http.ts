import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

import type { DescriptionSettings } from '@/types/description-settings.type';

type Params = {
  year: number;
  descriptionSettingsId: number;
};

type Response = {
  data: {
    description_settings: DescriptionSettings;
  };
};

export const httpUpdateDescriptionSettings = async ({ year, descriptionSettingsId }: Params) => {
  const apiUrl = API_PATHS.GOALS.UPDATE_DESCRIPTION_SETTINGS;
  const body = JSON.stringify({ year, description_settings_id: descriptionSettingsId });
  return fetchFromAPI<Response>(apiUrl, { method: 'POST', body });
};
