import { API_PATHS } from '@/constants/apiPaths';

import { fetchFromAPI } from '@/lib/http';

export const httpGetGoal = async (year: number) => {
  const queryParams = new URLSearchParams({ year: year.toString() });
  const apiUrl = API_PATHS.goals.get + '?' + queryParams.toString();
  return fetchFromAPI(apiUrl, { method: 'GET' });
};

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

export const httpChangeNameGoal = async (goalId: number, year: number, newName: string) => {
  const apiUrl = API_PATHS.goals.changeName;
  const body = JSON.stringify({ id: goalId, year, name: newName.trim() });
  return fetchFromAPI(apiUrl, { method: 'PUT', body });
};

export const httpCreateGoal = async (year: number, name: string) => {
  const apiUrl = API_PATHS.goals.create;
  const body = JSON.stringify({ year, name: name.trim() });
  return fetchFromAPI(apiUrl, { method: 'POST', body });
};
