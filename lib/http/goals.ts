import { API_PATHS } from '@/constants/apiPaths';

import { fetchFromAPI } from '@/lib/http';

export const httpUpdateGoal = async (goalId: number, isCompleted: boolean, year: number) => {
  const apiUrl = API_PATHS.goals.update;
  const body = JSON.stringify({ id: goalId, isCompleted, year });
  return fetchFromAPI(apiUrl, { method: 'POST', body });
};

export const httpRemoveGoal = async (goalId: number, year: number) => {
  const apiUrl = API_PATHS.goals.remove;
  const body = JSON.stringify({ id: goalId, year });
  return fetchFromAPI(apiUrl, { method: 'DELETE', body });
};
