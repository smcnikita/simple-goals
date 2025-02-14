import { prisma } from '@/lib/prisma';

import { GoalModel } from '@/models/goals-model';
import { yearsController } from './years-controller';

type CreateGoalParams = Omit<
  GoalModel,
  'id' | 'sort_order' | 'is_completed' | 'completed_at' | 'created_at' | 'updated_at'
>;

export const goalsController = {
  getUserGoalsByYearId: async (yearId: number) => {
    return await prisma.goals.findMany({
      where: { year_id: yearId },
      orderBy: { sort_order: 'asc' },
    });
  },

  getUserGoalsByYear: async (year: number, userId: number) => {
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

    const goals = await prisma.goals.findFirst({
      where: { year_id },
      orderBy: { sort_order: 'desc' },
    });

    const sortOrder = goals ? goals.sort_order + 1 : 0;

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
