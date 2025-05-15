import 'server-only';

import { prisma } from '@/lib/prisma';

export async function createUser(email: string, name: string, password: string) {
  const now = new Date();
  return await prisma.users.create({
    data: {
      email,
      name,
      password,
      created_at: now,
      updated_at: now,
    },
  });
}
