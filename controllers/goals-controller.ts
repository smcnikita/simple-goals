import { prisma } from '@/lib/prisma';

import { userController } from './user-controller';
import { yearsController } from './years-controller';

export const goalsController = {
  getUserGoalsByYear: async (year: number, userId: number) => {
    const user = await userController.getUserById(userId);

    if (!user) {
      return null;
    }

    const yearModel = await yearsController.getYearByName(userId, year);

    if (!yearModel) {
      return null;
    }

    return await prisma.goals.findMany({
      where: { year_id: yearModel.id },
      orderBy: { sort_order: 'asc' },
    });
  },

  updateGoal: async (goalId: number, isCompleted: boolean) => {
    return await prisma.goals.update({
      where: { id: goalId },
      data: {
        is_completed: isCompleted,
        completed_at: isCompleted ? new Date() : null,
      },
    });
  },
};
