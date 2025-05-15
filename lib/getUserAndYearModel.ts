import { createErrorResponse } from '@/lib/createErrorResponse';
import { getUserIdOrUnauthorized } from '@/lib/getUserIdOrUnauthorized';
import { getYearModelOrError } from '@/lib/getYearModelOrError';

export async function getUserAndYearModel(year: number) {
  if (Number.isNaN(year)) {
    return createErrorResponse('Year is invalid', 422);
  }

  const userIdOrRes = await getUserIdOrUnauthorized();

  if (userIdOrRes instanceof Response) {
    return userIdOrRes;
  }

  const yearModel = await getYearModelOrError(userIdOrRes, year);

  if (yearModel instanceof Response) {
    return yearModel;
  }

  return [userIdOrRes, yearModel] as const;
}
