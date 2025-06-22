import { prisma } from '@/lib/prisma';

import type { CreateUserYearParams } from './types';
import { BaseResponse } from '@/types/base-controller.type';
import { YearModel } from '@/types/years.types';

export async function createUserYear({ userId, year }: CreateUserYearParams): Promise<BaseResponse<YearModel>> {
  const yearModel = await prisma.years.create({
    data: {
      year,
      user_id: userId,
    },
  });

  return {
    status: 'success',
    data: yearModel,
  };
}
