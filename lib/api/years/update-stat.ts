import { API_PATHS } from '@/constants/api-paths';
import { fetchFromAPI } from '@/lib/http';

import type { YearModel } from '@/types/years.types';

type HttpUpdateShowStatisticParams = {
  year: number;
};

type UpdateShowStatisticResponse = {
  data: {
    year: YearModel;
  };
};

export const httpUpdateShowStatistic = async ({ year }: HttpUpdateShowStatisticParams) => {
  const apiUrl = API_PATHS.GOALS.UPDATE_SHOW_STATISTIC;
  const body = JSON.stringify({ year });
  return fetchFromAPI<UpdateShowStatisticResponse>(apiUrl, { method: 'POST', body });
};
