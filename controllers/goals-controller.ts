import { prisma } from '@/lib/prisma';

import { userController } from './user-controller';
import { yearsController } from './years-controller';
import { GoalModel } from '@/models/goals-model';

type CreateGoalParams = Omit<
  GoalModel,
  'id' | 'sort_order' | 'is_completed' | 'completed_at' | 'created_at' | 'updated_at'
>;

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

  updateGoal: async (goalId: number, isCompleted: boolean, yearId: number) => {
    return await prisma.goals.update({
      where: {
        id: goalId,
        year_id: yearId,
      },
      data: {
        is_completed: isCompleted,
        completed_at: isCompleted ? new Date() : null,
      },
    });
  },

  removeGoal: async (goalId: number, yearId: number) => {
    return await prisma.goals.delete({
      where: {
        id: goalId,
        year_id: yearId,
      },
    });
  },

  createGoal: async ({ name, year_id }: CreateGoalParams) => {
    const now = new Date();

    const goals = await prisma.goals.findMany({
      where: { year_id },
      orderBy: { sort_order: 'desc' },
    });

    const sortOrder = goals.length > 0 ? goals[0].sort_order + 1 : 0;

    return await prisma.goals.create({
      data: {
        name,
        year_id,
        is_completed: false,
        completed_at: null,
        sort_order: sortOrder,
        created_at: now,
        updated_at: now,
      },
    });
  },

  editGoal: async (goalId: number, name: string) => {
    return await prisma.goals.update({
      where: { id: goalId },
      data: { name },
    });
  },

  updateGoalOrder: async (goalId: number, sortOrder: number) => {
    return await prisma.goals.update({
      where: { id: goalId },
      data: { sort_order: sortOrder },
    });
  },
};
