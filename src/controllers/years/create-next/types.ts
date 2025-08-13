import type { BaseResponse } from '@/types/controllers/base';
import type { ResponseError } from '@/types/controllers/response-error';
import type { YearModel } from '@/types/years/year';

export type CreateNextResponse = Promise<BaseResponse<YearModel> | ResponseError>;
