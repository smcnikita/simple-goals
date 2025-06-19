import { hash } from 'bcryptjs';

import { prisma } from '@/lib/prisma';

import type { Params } from './types';
import { yearsService } from '@/services/years/years.service';

export const createUser = async ({ email, name, password }: Params) => {
  const hashedPassword = await hash(password, 12);
  const nowYear = new Date().getFullYear();

  const user = await prisma.users.create({
    data: { email, name, password: hashedPassword },
  });

  await yearsService.createUserYear({
    userId: user.id,
    year: nowYear,
  });
};
