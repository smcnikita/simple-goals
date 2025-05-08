import { prisma } from '@/lib/prisma';

type CreateGoalParams = {
  userId: number;
  yearId: number;
  name: string;
  description: string | null;
  statusId: number;
};

export async function createGoal(params: CreateGoalParams) {
  const { name, description, statusId, userId, yearId } = params;

  return await prisma.goals.create({
    data: {
      name,
      description,
      status_id: statusId,
      user_id: userId,
      year_id: yearId,
    },
  });
}

type UpdateGoalParams = {
  id: number;
  userId: number;
  yearId: number;
  name: string;
  description: string | null;
  statusId: number;
};

export async function updateGoal(params: UpdateGoalParams) {
  const { id, name, description, statusId, userId, yearId } = params;

  return await prisma.goals.update({
    data: {
      name,
      description,
      status_id: statusId,
    },
    where: {
      id: id,
      user_id: userId,
      year_id: yearId,
    },
  });
}
