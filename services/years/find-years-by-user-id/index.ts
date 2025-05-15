import { prisma } from '@/lib/prisma';

import type { YearModel } from '@/types/years.types';
import type { FindYearsByUserIdParams } from './types';

export async function findYearsByUserId({ userId }: FindYearsByUserIdParams): Promise<YearModel[]> {
  const years = await prisma.years.findMany({
    where: { user_id: userId },
  });

  return years;
}
