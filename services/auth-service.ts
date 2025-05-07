import 'server-only';

import type { Account, User } from 'next-auth';
import type { AdapterUser } from 'next-auth/adapters';

import { prisma } from '@/lib/prisma';

export async function findOrCreateUser(email: string, name: string, password: string): Promise<string> {
  const existingUser = await prisma.users.findUnique({ where: { email } });

  if (existingUser) {
    return existingUser.id.toString();
  }

  const newUser = await createUser(email, name, password);
  return newUser.id.toString();
}

export async function findOrCreateUserByOAuth(
  user: User | AdapterUser,
  account: Account | null
): Promise<string | null> {
  if (!user.email) {
    return null;
  }

  const provider = account?.provider;

  if (!provider) {
    return null;
  }

  const defaultName = 'unknown';
  const password = `no-password-${provider}`;

  return await findOrCreateUser(user.email, user.name ?? defaultName, password);
}

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
