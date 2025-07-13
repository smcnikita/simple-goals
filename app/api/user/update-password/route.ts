import { NextRequest } from 'next/server';

import { createErrorResponse } from '@/lib/createErrorResponse';
import { getUserIdOrUnauthorized } from '@/lib/getUserIdOrUnauthorized';
import { createSuccessResponse } from '@/lib/createSuccessResponse';

import * as userController from '@/controllers/user';

type Payload = {
  password: string;
  old_password: string;
};

export async function PUT(req: NextRequest) {
  const { password, old_password } = (await req.json()) as Payload;

  if (!password || !old_password) {
    return createErrorResponse('Missing required fields', 422);
  }

  const userIdOrRes = await getUserIdOrUnauthorized();

  if (userIdOrRes instanceof Response) {
    return userIdOrRes;
  }

  const userId = userIdOrRes;

  const updatePassword = await userController.updatePassword(userId, password, old_password);

  if (updatePassword.status === 'error') {
    return createErrorResponse(updatePassword.message, 500);
  }

  return createSuccessResponse({
    status: updatePassword.status,
    data: null,
  });
}
