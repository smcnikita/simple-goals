import type { BaseResponse } from '@/types/base-controller.type';
import type { ResponseError } from '@/types/response-error.types';
import type { YearModel } from '@/types/years.types';

export type CreateNextYearResponse = Promise<BaseResponse<YearModel> | ResponseError>;
