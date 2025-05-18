import { getUserIdOrUnauthorized } from '@/lib/getUserIdOrUnauthorized';
import { createErrorResponse } from '@/lib/createErrorResponse';
import { createSuccessResponse } from '@/lib/createSuccessResponse';

import { yearsController } from '@/controllers/years/years.controller';

export async function POST() {
  const userIdOrRes = await getUserIdOrUnauthorized();

  if (userIdOrRes instanceof Response) {
    return userIdOrRes;
  }

  const userId = userIdOrRes;

  const newYear = await yearsController.createNextYear(userId);

  if ('error' in newYear) {
    return createErrorResponse(newYear.error, 500);
  }

  return createSuccessResponse(newYear);
}
