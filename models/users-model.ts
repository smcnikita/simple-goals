'use server';

import type { users } from '@prisma/client';

export type UserModel = Omit<users, 'password'>;
export type UserFullModel = users;
