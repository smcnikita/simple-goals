import type { BaseResponse } from '@/types/base-controller.type';

import { userService } from '@/services/user/user.service';

import type { UpdateNameData, UpdateNameParams } from './types';

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
