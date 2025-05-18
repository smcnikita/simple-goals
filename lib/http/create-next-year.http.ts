import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

import type { CreateNextResponseApi } from '@/app/api/user/years/create-next/types';

export const httpCreateNextYear = async () => {
  const apiUrl = API_PATHS.CREATE_NEXT_YEAR;

  return fetchFromAPI<CreateNextResponseApi>(apiUrl, { method: 'POST' });
};
