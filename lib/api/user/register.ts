import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

import type { CreateNextResponseApi } from '@/app/api/user/years/create-next/types';

type Params = {
  email: string;
  name: string;
  password: string;
};

export const httpRegister = async ({ email, name, password }: Params) => {
  const apiUrl = API_PATHS.REGISTER;
  const body = JSON.stringify({ email, name, password });
  return fetchFromAPI<CreateNextResponseApi>(apiUrl, { method: 'POST', body });
};
