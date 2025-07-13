import type { BaseResponse } from '@/types/base-controller.type';

import type { UpdateNameParams, UpdateNameData } from './types';
import { prisma } from '@/lib/prisma/prisma';

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
