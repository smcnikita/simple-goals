import { prisma } from '@/lib/prisma';

import { createUserYear } from '@/services/years/create-user-year';

import type { YearModel } from '@/types/years.types';

import type { GetUserYearsParams } from './types';

export async function findOrCreate({ userId, descriptionSettingsId }: GetUserYearsParams): Promise<YearModel[]> {
  const nowYear = new Date().getFullYear();

  const years = await prisma.years.findMany({
    where: { user_id: userId },
  });

  const nowUserYears = years.find((el) => el.year === nowYear);

  if (!nowUserYears) {
    const newYear = await createUserYear({
      userId,
      year: nowYear,
      descriptionSettingsId,
    });

    if (newYear.status === 'success') {
      return [...years, newYear.data];
    }
  }

  return years;
}
