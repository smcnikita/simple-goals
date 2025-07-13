import { NextRequest } from 'next/server';

import { createSuccessResponse } from '@/lib/createSuccessResponse';
import { createErrorResponse } from '@/lib/createErrorResponse';
import { getUserIdOrUnauthorized } from '@/lib/getUserIdOrUnauthorized';

import * as userController from '@/controllers/user';

import { userService } from '@/services/user/user.service';

type Payload = {
  description_settings_id: number;
};

export async function POST(req: NextRequest) {
  const { description_settings_id } = (await req.json()) as Payload;

  if (!description_settings_id) {
    return createErrorResponse('Missing required fields', 422);
  }

  const userIdOrRes = await getUserIdOrUnauthorized();

  if (userIdOrRes instanceof Response) {
    return userIdOrRes;
  }

  const userId = userIdOrRes;

  const updatedUser = await userController.updateDescriptionSettings({
    id: userId,
    descriptionSettingsId: description_settings_id,
  });

  if (!updatedUser || updatedUser.description_settings_id === null) {
    return createErrorResponse('Year not found', 400);
  }

  return createSuccessResponse({
    description_settings: await userService.getDescriptionSettingsById(updatedUser.description_settings_id),
  });
}
