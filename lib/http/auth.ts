import { API_PATHS } from '@/constants/apiPaths';

import { fetchFromAPI } from '@/lib/http';

export const httpSignIn = async (email: string, password: string) => {
  const apiUrl = API_PATHS.auth.signIn;
  const body = JSON.stringify({ email, password });
  return fetchFromAPI(apiUrl, { method: 'POST', body });
};

export const httpLogout = async () => {
  const apiUrl = API_PATHS.auth.logout;
  return fetchFromAPI(apiUrl, { method: 'POST' });
};
