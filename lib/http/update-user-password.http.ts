import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

export const httpUpdateUserPassword = async (password: string, oldPassword: string) => {
  const apiUrl = API_PATHS.UPDATE_USER_PASSWORD;
  const body = JSON.stringify({ password, old_password: oldPassword });
  return fetchFromAPI(apiUrl, { method: 'PUT', body });
};
