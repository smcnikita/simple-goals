import { prisma } from '@/lib/prisma/prisma';

import type { YearModel } from '@/types/years.types';
import type { FindByUserParams } from './types';

export async function findYearsByUserId({ userId }: FindByUserParams): Promise<YearModel[]> {
  const years = await prisma.years.findMany({
    where: { user_id: userId },
  });

  return years;
}
