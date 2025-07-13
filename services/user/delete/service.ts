import { prisma } from '@/lib/prisma/prisma';

export const deleteUser = async (id: number) => {
  const useGoals = await prisma.goals.findMany({
    where: {
      user_id: id,
    },
  });

  useGoals.forEach(async (goal) => {
    await prisma.goals.delete({
      where: { id: goal.id },
    });
  });

  const userYears = await prisma.years.findMany({
    where: {
      user_id: id,
    },
  });

  userYears.forEach(async (year) => {
    await prisma.years.delete({
      where: { id: year.id },
    });
  });

  return await prisma.users.delete({
    where: { id },
  });
};
