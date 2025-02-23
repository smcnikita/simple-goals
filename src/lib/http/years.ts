import { API_PATHS } from '@/constants/apiPaths';

import { fetchFromAPI } from '@/lib/http';

export const httpGetYears = async () => {
  const apiUrl = API_PATHS.years.get;
  return fetchFromAPI(apiUrl, { method: 'GET' });
};
