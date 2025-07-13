import { createSuccessResponse } from '@/lib/responses/createSuccessResponse';
import { getUserIdOrUnauthorized } from '@/lib/auth/getUserIdOrUnauthorized';

import * as goalsController from '@/controllers/goals';

export async function POST() {
  const userIdOrRes = await getUserIdOrUnauthorized();

  if (userIdOrRes instanceof Response) {
    return userIdOrRes;
  }

  const userId = userIdOrRes;

  await goalsController.encryptGoals(userId);

  return createSuccessResponse(null);
}
