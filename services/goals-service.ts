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
