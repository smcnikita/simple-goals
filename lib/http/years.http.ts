import { API_PATHS } from '@/constants/api-paths';
import { fetchFromAPI } from '@/lib/http';

import type { Year } from '@/types/years.types';

type HttpUpdateShowStatisticParams = {
  year: number;
};

type UpdateShowStatisticResponse = {
  data: {
    year: Year;
  };
};

export const httpUpdateShowStatistic = async ({ year }: HttpUpdateShowStatisticParams) => {
  const apiUrl = API_PATHS.GOALS.UPDATE_SHOW_STATISTIC;
  const body = JSON.stringify({ year });
  return fetchFromAPI<UpdateShowStatisticResponse>(apiUrl, { method: 'POST', body });
};

type HttpUpdateCanEditPastParams = {
  year: number;
};

type UpdateCanEditPastResponse = {
  data: {
    year: Year;
  };
};

export const httpUpdateCanEditPast = async ({ year }: HttpUpdateCanEditPastParams) => {
  const apiUrl = API_PATHS.GOALS.UPDATE_CAN_EDIT_PAST;
  const body = JSON.stringify({ year });
  return fetchFromAPI<UpdateCanEditPastResponse>(apiUrl, { method: 'POST', body });
};
