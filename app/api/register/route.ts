import { NextRequest } from 'next/server';
import { getTranslations } from 'next-intl/server';

import { createErrorResponse } from '@/lib/createErrorResponse';
import { createSuccessResponse } from '@/lib/createSuccessResponse';

import { userController } from '@/controllers/user/user.controller';

type RegisterPayload = {
  email: string;
  name: string;
  password: string;
};

export async function POST(req: NextRequest) {
  const { email, name, password } = (await req.json()) as RegisterPayload;
  const t = await getTranslations('errors');

  if (!email || !name || !password) {
    return createErrorResponse(t('required_fields'), 422);
  }

  const userErrorMessage = await userController.createUser({ email, name, password });

  if (userErrorMessage.status === 'error') {
    return createErrorResponse(userErrorMessage.message, 422);
  }

  return createSuccessResponse({
    status: userErrorMessage.status,
    data: userErrorMessage.data,
  });
}
