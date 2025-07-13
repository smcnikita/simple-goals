import { createSuccessResponse } from '@/lib/createSuccessResponse';
import { getUserIdOrUnauthorized } from '@/lib/getUserIdOrUnauthorized';

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
