import { prisma } from '@/lib/prisma/prisma';

import type { BaseResponse } from '@/types/controllers/base';

import type { UpdateNameParams, UpdateNameData } from './types';

export const updateUserName = async ({ name, userId }: UpdateNameParams): Promise<BaseResponse<UpdateNameData>> => {
  const user = await prisma.users.update({
    where: { id: userId },
    data: { name },
  });

  return {
    status: 'success',
    data: {
      name: user.name,
    },
  };
};
