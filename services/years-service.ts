import { prisma } from '@/lib/prisma';
import { Years } from '@/types/years.types';

type GetUserYearsParams = {
  userId: number;
};

type CreateUserYearParams = {
  userId: number;
  year: number;
};

export async function createUserYear({ userId, year }: CreateUserYearParams) {
  return await prisma.years.create({
    data: {
      year,
      user_id: userId,
    },
  });
}

export async function getUserYears({ userId }: GetUserYearsParams): Promise<Years> {
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

    return [...years, newYear];
  }

  return years;
}

export async function onlyGetUserYears({ userId }: GetUserYearsParams): Promise<Years> {
  const years = await prisma.years.findMany({
    where: { user_id: userId },
  });

  return years;
}
