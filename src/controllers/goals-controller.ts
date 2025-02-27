import { prisma } from '@/lib/prisma';

import { GoalModel } from '@/models/goals-model';
import { yearsController } from './years-controller';

type CreateGoalParams = Omit<
  GoalModel,
  'id' | 'sort_order' | 'is_completed' | 'completed_at' | 'created_at' | 'updated_at' | 'description'
>;

type EditData = {
  name: string;
  description?: string;
};

export const goalsController = {
  getUserGoalsByYearId: async (yearId: number, userId: number) => {
    return await prisma.goals.findMany({
      where: { year_id: yearId, user_id: userId },
      orderBy: { created_at: 'asc' },
    });
  },

  getUserGoalsByYear: async (year: number, userId: number) => {
    const yearModel = await yearsController.getYearByName(userId, year);

    if (!yearModel) {
      return null;
    }

    return await prisma.goals.findMany({
      where: { year_id: yearModel.id },
      orderBy: { created_at: 'asc' },
    });
  },

  updateGoal: async (goalId: number, isCompleted: boolean, yearId: number, userId: number) => {
    return await prisma.goals.update({
      where: {
        id: goalId,
        year_id: yearId,
        user_id: userId,
      },
      data: {
        is_completed: isCompleted,
        completed_at: isCompleted ? new Date() : null,
      },
    });
  },

  removeGoal: async (goalId: number, yearId: number, userId: number) => {
    return await prisma.goals.delete({
      where: {
        id: goalId,
        year_id: yearId,
        user_id: userId,
      },
    });
  },

  createGoal: async ({ name, year_id, user_id }: CreateGoalParams) => {
    const now = new Date();

    await prisma.statistics.update({
      where: { id: 1 },
      data: { count: { increment: 1 } },
    });

    return await prisma.goals.create({
      data: {
        name,
        year_id,
        user_id,
        is_completed: false,
        completed_at: null,
        created_at: now,
        updated_at: now,
      },
    });
  },

  editGoal: async (goalId: number, name: string, userId: number, description?: string) => {
    const data: EditData = { name };

    if (description !== undefined) {
      data['description'] = description;
    }

    return await prisma.goals.update({
      where: {
        id: goalId,
        user_id: userId,
      },
      data,
    });
  },
};
