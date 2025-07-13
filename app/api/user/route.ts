import { createSuccessResponse } from '@/lib/responses/createSuccessResponse';
import { getUserIdOrUnauthorized } from '@/lib/auth/getUserIdOrUnauthorized';

import * as userController from '@/controllers/user';

export async function DELETE() {
  const userIdOrRes = await getUserIdOrUnauthorized();

  if (userIdOrRes instanceof Response) {
    return userIdOrRes;
  }

  const userId = userIdOrRes;

  const deletedUser = await userController.deleteUser(userId);

  return createSuccessResponse(deletedUser);
}
