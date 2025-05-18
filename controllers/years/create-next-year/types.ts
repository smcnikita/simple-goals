import type { ResponseError } from '@/types/response-error.types';
import type { YearModel } from '@/types/years.types';

export type CreateNextYearResponse = Promise<YearModel | ResponseError>;
