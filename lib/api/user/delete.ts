import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

export const httpDeleteUser = async () => {
  const apiUrl = API_PATHS.DELETE_USER;
  return fetchFromAPI(apiUrl, { method: 'DELETE' });
};
