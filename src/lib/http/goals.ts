import { API_PATHS } from '@/constants/apiPaths';

import { fetchFromAPI } from '@/lib/http';

export const httpGetGoal = async (year: number, month?: string) => {
  const queryParams = new URLSearchParams({ year: year.toString(), month: month ?? '' });
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

export const httpChangeNameAndDescriptionGoal = async (
  goalId: number,
  year: number,
  newName: string,
  newDescription: string
) => {
  const apiUrl = API_PATHS.goals.updateNameAndDescription;
  const body = JSON.stringify({ id: goalId, year, name: newName.trim(), description: newDescription.trim() });
  return fetchFromAPI(apiUrl, { method: 'PUT', body });
};

export const httpCreateGoal = async (year: number, name: string, month?: string) => {
  const apiUrl = API_PATHS.goals.create;
  const body = JSON.stringify({ year, name: name.trim(), month: month ?? undefined });
  return fetchFromAPI(apiUrl, { method: 'POST', body });
};
