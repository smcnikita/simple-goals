import { prisma } from '@/lib/prisma/prisma';

import { createUserYear } from '@/services/years/create/service';

import type { FindOrCreateParams } from './types';

import type { YearModel } from '@/types/years/year';

export async function findOrCreate({ userId }: FindOrCreateParams): Promise<YearModel[]> {
  const nowYear = new Date().getFullYear();

  const years = await prisma.years.findMany({
    where: { user_id: userId },
  });

  const nowUserYears = years.find((el) => el.year === nowYear);

  if (!nowUserYears) {
    const newYear = await createUserYear({
      userId,
      year: nowYear,
    });

    if (newYear.status === 'success') {
      return [...years, newYear.data];
    }
  }

  return years;
}
