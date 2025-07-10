import { prisma } from '@/lib/prisma';

export const decryptGoals = async (userId: number) => {
  return await prisma.users.update({
    where: { id: userId },
    data: {
      is_encrypted_goals: false,
    },
  });
};
