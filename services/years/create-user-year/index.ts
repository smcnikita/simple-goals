import { prisma } from '@/lib/prisma';

import type { CreateUserYearParams } from './types';

export async function createUserYear({ userId, year }: CreateUserYearParams) {
  return await prisma.years.create({
    data: {
      year,
      user_id: userId,
    },
  });
}
