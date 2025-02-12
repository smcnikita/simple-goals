import { API_PATHS } from '@/constants/apiPaths';

import { fetchFromAPI } from '@/lib/http';

export const httpUpdateGoal = async (goalId: number, isCompleted: boolean) => {
  const apiUrl = API_PATHS.goals.update;
  const body = JSON.stringify({
    id: goalId,
    isCompleted,
  });
  return fetchFromAPI(apiUrl, {
    method: 'POST',
    body,
  });
};
