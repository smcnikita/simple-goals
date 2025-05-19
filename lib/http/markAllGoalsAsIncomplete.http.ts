import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

import type { MarkAllAsIncompleteResponse } from '@/app/api/goals/mark-all-incomplete/types';

export const httpMarkAllAsIncomplete = async (year: number) => {
  const apiUrl = API_PATHS.GOALS.MARK_ALL_AS_INCOMPLETE;
  const body = JSON.stringify({ year });
  return fetchFromAPI<MarkAllAsIncompleteResponse>(apiUrl, { method: 'POST', body });
};
