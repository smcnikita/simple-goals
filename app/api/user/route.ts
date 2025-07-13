import { createSuccessResponse } from '@/lib/createSuccessResponse';
import { getUserIdOrUnauthorized } from '@/lib/getUserIdOrUnauthorized';

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
