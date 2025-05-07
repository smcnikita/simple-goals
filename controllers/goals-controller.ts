import { prisma } from '@/lib/prisma';

type GetUserGoalsParams = {
  userId: number;
  yearId: number;
};

export const goalsController = {
  getUserGoals: async ({ userId, yearId }: GetUserGoalsParams) => {
    const userGoals = await prisma.goals.findMany({
      where: {
        user_id: userId,
        year_id: yearId,
      },
    });

    return userGoals.map(async (goal) => ({
      ...goal,
      status: await prisma.statuses.findUnique({
        where: { id: goal.id },
      }),
    }));
  },
};
