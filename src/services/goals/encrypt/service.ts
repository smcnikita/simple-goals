import { prisma } from '@/lib/prisma/prisma';

const deleteGoal = async (id: number, year: number) => {
  return await prisma.goals.delete({
    where: { id, year_id: year },
  });
};

export const cryptGoals = async (userId: number, isEncrypted: boolean = true) => {
  const goals = await prisma.goals.findMany({
    where: { user_id: userId },
  });

  goals.forEach(async (goal) => {
    await deleteGoal(goal.id, goal.year_id);
  });

  await prisma.users.update({
    where: { id: userId },
    data: {
      is_encrypted_goals: isEncrypted,
    },
  });

  return {
    status: 'success',
  };
};
