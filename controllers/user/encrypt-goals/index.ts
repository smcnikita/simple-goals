import { prisma } from '@/lib/prisma';

export const encryptGoals = async (userId: number) => {
  return await prisma.users.update({
    where: { id: userId },
    data: {
      is_encrypted_goals: true,
    },
  });
};
