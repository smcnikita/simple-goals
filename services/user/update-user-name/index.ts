import type { BaseResponse } from '@/types/base-controller.type';

import type { Params, Data } from './types';
import { prisma } from '@/lib/prisma';

export const updateUserName = async ({ name, userId }: Params): Promise<BaseResponse<Data>> => {
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
