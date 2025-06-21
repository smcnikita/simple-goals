import { userService } from '@/services/user/user.service';

import { BaseResponse } from '@/types/base-controller.type';

import type { Params } from './types';

export const createUser = async ({ email, name, password }: Params): Promise<BaseResponse<null>> => {
  const createUserService = await userService.createUser({ email, name, password });

  if (createUserService.status === 'error') {
    return {
      status: 'error',
      message: createUserService.message,
    };
  }

  return {
    status: 'success',
    data: createUserService.data,
  };
};
