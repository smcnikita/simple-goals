import * as userService from '@/services/user';

import type { UpdateNameData, UpdateNameParams } from './types';

import type { BaseResponse } from '@/types/base-controller.type';

export const updateUserName = async (params: UpdateNameParams): Promise<BaseResponse<UpdateNameData>> => {
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
