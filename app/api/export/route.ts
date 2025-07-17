import { getUserIdOrUnauthorized } from '@/lib/auth/getUserIdOrUnauthorized';

import * as goalsController from '@/controllers/goals';
import { createSuccessResponse } from '@/lib/responses/createSuccessResponse';

export async function GET() {
  const userIdOrRes = await getUserIdOrUnauthorized();

  if (userIdOrRes instanceof Response) {
    return userIdOrRes;
  }

  const exportGoals = await goalsController.exportGoals(userIdOrRes);

  return createSuccessResponse(exportGoals);
}
