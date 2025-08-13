import type { Account, User } from 'next-auth';
import type { AdapterUser } from 'next-auth/adapters';

import { findOrCreateUser } from '../find-or-create/service';

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
