import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/prisma/prisma';
import { authOptions } from '@/lib/auth/auth';

export const getIsUserGoalsEncrypted = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Session is not defined. Please ensure that the session is initialized before proceeding.');
  }

  const user = await prisma.users.findUnique({
    where: { id: Number(session.user.id) },
    omit: { password: true },
  });

  if (!user) {
    throw new Error('User is not defined. Please ensure that the user is initialized before proceeding.');
  }

  return user.is_encrypted_goals;
};
