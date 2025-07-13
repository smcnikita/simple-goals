import * as userService from '@/services/user';

import type { CreateUserParams } from './types';

import type { BaseResponse } from '@/types/base-controller.type';

export const createUser = async ({ email, name, password }: CreateUserParams): Promise<BaseResponse<null>> => {
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
