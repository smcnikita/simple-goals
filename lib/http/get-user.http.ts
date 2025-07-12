import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

import type { Users } from '@prisma/client';

type Response = Omit<Users, 'password'>;

export const httpGetUser = async () => {
  const apiUrl = API_PATHS.GET_USER;
  return fetchFromAPI<Response>(apiUrl);
};
