'use server';

import { prisma } from '@/lib/prisma';
import { UserModel } from '@/models/users-model';

export const userController = {
  getUserById: async (id: number): Promise<UserModel | null> => {
    return await prisma.users.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, created_at: true, updated_at: true },
    });
  },

  getUserByEmail: async (email: string): Promise<UserModel | null> => {
    return await prisma.users.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, created_at: true, updated_at: true },
    });
  },
};
