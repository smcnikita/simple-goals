import { createSuccessResponse } from '@/lib/createSuccessResponse';
import { getUserIdOrUnauthorized } from '@/lib/getUserIdOrUnauthorized';

import { userController } from '@/controllers/user/user.controller';

export async function POST() {
  const userIdOrRes = await getUserIdOrUnauthorized();

  if (userIdOrRes instanceof Response) {
    return userIdOrRes;
  }

  const userId = userIdOrRes;

  await userController.decryptGoals(userId);

  return createSuccessResponse(null);
}
