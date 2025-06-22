import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

import type { UpdateNameResponseData } from '@/app/api/user/update-name/types';

export const httpUpdateUserName = async (name: string) => {
  const apiUrl = API_PATHS.UPDATE_USER_NAME;
  const body = JSON.stringify({ name });
  return fetchFromAPI<{
    data: UpdateNameResponseData;
  }>(apiUrl, { method: 'PUT', body });
};
