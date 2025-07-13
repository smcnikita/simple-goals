import { prisma } from '@/lib/prisma';

export async function findYear(userId: number, year: number) {
  return await prisma.years.findFirst({
    where: {
      user_id: userId,
      year,
    },
  });
}
