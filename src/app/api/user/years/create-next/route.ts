import { getUserIdOrUnauthorized } from '@/lib/auth/getUserIdOrUnauthorized';
import { createErrorResponse } from '@/lib/responses/createErrorResponse';
import { createSuccessResponse } from '@/lib/responses/createSuccessResponse';

import * as yearsController from '@/controllers/years';

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
