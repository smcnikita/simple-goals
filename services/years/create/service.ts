import { prisma } from '@/lib/prisma/prisma';

import type { CreateParams } from './types';

import type { BaseResponse } from '@/types/controllers/base';
import type { YearModel } from '@/types/years/year';

export async function createUserYear({ userId, year }: CreateParams): Promise<BaseResponse<YearModel>> {
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
