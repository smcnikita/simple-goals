import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

import type { DescriptionSettings } from '@/types/settings/description';

type Response = {
  data: {
    description_settings: DescriptionSettings;
  };
};

export const httpUpdateDescriptionSettings = async (id: number) => {
  const apiUrl = API_PATHS.GOALS.UPDATE_DESCRIPTION_SETTINGS;
  const body = JSON.stringify({ description_settings_id: id });
  return fetchFromAPI<Response>(apiUrl, { method: 'POST', body });
};
