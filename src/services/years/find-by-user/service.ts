import { prisma } from '@/lib/prisma/prisma';

import type { FindByUserParams } from './types';

import type { YearModel } from '@/types/years/year';

export async function findYearsByUserId({ userId }: FindByUserParams): Promise<YearModel[]> {
  const years = await prisma.years.findMany({
    where: { user_id: userId },
  });

  return years;
}
