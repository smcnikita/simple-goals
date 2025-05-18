import type { YearModel } from '@/types/years.types';

type SuccessResponse = {
  data: YearModel;
};

export type CreateNextResponseApi = SuccessResponse;
