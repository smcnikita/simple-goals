import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

export const httpEncryptGoals = async () => {
  const apiUrl = API_PATHS.ENCRYPT_GOALS;
  return fetchFromAPI(apiUrl, { method: 'POST' });
};

export const httpDecryptGoals = async () => {
  const apiUrl = API_PATHS.DECRYPT_GOALS;
  return fetchFromAPI(apiUrl, { method: 'POST' });
};
