import type { BaseResponse } from '@/types/base-controller.type';

import { userService } from '@/services/user/user.service';

import type { Params, Data } from './types';

export const updateUserName = async (params: Params): Promise<BaseResponse<Data>> => {
  const updateUserNameService = await userService.updateUserName(params);

  if (updateUserNameService.status === 'error') {
    return {
      status: 'error',
      message: updateUserNameService.message,
    };
  }

  return {
    status: 'success',
    data: updateUserNameService.data,
  };
};
