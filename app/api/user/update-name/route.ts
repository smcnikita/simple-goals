import { NextRequest } from 'next/server';

import { getUserIdOrUnauthorized } from '@/lib/getUserIdOrUnauthorized';
import { createErrorResponse } from '@/lib/createErrorResponse';
import { createSuccessResponse } from '@/lib/createSuccessResponse';

import { userController } from '@/controllers/user/user.controller';

import type { UpdateNameResponseData } from './types';

type Payload = {
  name: string;
};

export async function PUT(req: NextRequest) {
  const { name } = (await req.json()) as Payload;

  if (!name) {
    return createErrorResponse('Missing required fields', 422);
  }

  const userIdOrRes = await getUserIdOrUnauthorized();

  if (userIdOrRes instanceof Response) {
    return userIdOrRes;
  }

  const userId = userIdOrRes;

  const newName = await userController.updateUserName({ name, userId });

  if (newName.status === 'error') {
    return createErrorResponse(newName.message, 500);
  }

  return createSuccessResponse<UpdateNameResponseData>({
    status: newName.status,
    data: newName.data,
  });
}
