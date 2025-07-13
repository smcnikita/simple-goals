import type { YearModel } from '@/types/years/year';

type SuccessResponse = {
  data: YearModel;
};

export type CreateNextResponseApi = SuccessResponse;
