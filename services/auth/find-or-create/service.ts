import { prisma } from '@/lib/prisma/prisma';

import { createUser } from '../create/service';

export async function findOrCreateUser(email: string, name: string, password: string): Promise<string> {
  const existingUser = await prisma.users.findUnique({ where: { email } });

  if (existingUser) {
    return existingUser.id.toString();
  }

  const newUser = await createUser(email, name, password);
  return newUser.id.toString();
}
