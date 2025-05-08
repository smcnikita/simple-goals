import { prisma } from '@/lib/prisma';

import { createGoal, updateGoal } from '@/services/goals-service';

import type { StatusKeys } from '@/types/statuses.types';

type GetUserGoalsParams = {
  userId: number;
  yearId: number;
};

type CreateGoalParams = {
  userId: number;
  yearId: number;
  name: string;
  description: string | null;
  statusKey: StatusKeys;
};

type DeleteGoalsParams = {
  id: number;
  userId: number;
};

type UpdateGoalParams = {
  id: number;
  userId: number;
  yearId: number;
  name: string;
  description: string | null;
  statusKey: StatusKeys;
};

export const goalsController = {
  getUserGoals: async ({ userId, yearId }: GetUserGoalsParams) => {
    const userGoals = await prisma.goals.findMany({
      where: {
        user_id: userId,
        year_id: yearId,
      },
      orderBy: [
        {
          created_at: 'asc',
        },
      ],
    });

    const statusItems = await prisma.statuses.findMany();
    const statusMap = new Map(statusItems.map((status) => [status.id, status.key]));

    return userGoals.map((goal) => ({
      ...goal,
      status: statusMap.get(goal.status_id) ?? null,
    }));
  },

  createGoal: async (params: CreateGoalParams) => {
    const { name, description, statusKey, userId, yearId } = params;

    const statusModel = await prisma.statuses.findFirst({
      where: {
        key: statusKey,
      },
    });

    if (!statusModel) {
      return null;
    }

    return {
      data: await createGoal({
        description,
        name,
        statusId: statusModel.id,
        userId,
        yearId,
      }),
      status: statusModel.key,
    };
  },

  deleteGoal: async (params: DeleteGoalsParams) => {
    const { id, userId } = params;

    return await prisma.goals.delete({
      where: { id, user_id: userId },
    });
  },

  updateGoal: async (params: UpdateGoalParams) => {
    const { id, name, description, statusKey, userId, yearId } = params;

    const statusModel = await prisma.statuses.findFirst({
      where: {
        key: statusKey,
      },
    });

    if (!statusModel) {
      return null;
    }

    return {
      data: await updateGoal({
        id,
        description,
        name,
        statusId: statusModel.id,
        userId,
        yearId,
      }),
      status: statusModel.key,
    };
  },
};
