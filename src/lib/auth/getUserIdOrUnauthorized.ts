import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth/auth';
import { createErrorResponse } from '@/lib/responses/createErrorResponse';

type NextResponseType = NextResponse<{ message: string }>;

export async function getUserIdOrUnauthorized(): Promise<number | NextResponseType> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return createErrorResponse('Unauthorized', 401);
  }

  const userId = Number(session.user.id);

  return userId;
}
