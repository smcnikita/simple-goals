import type * as userController from '@/controllers/user';

import type { BaseResponseStatus } from '@/types/base-controller.type';

export type UpdateNameResponseData = {
  status: BaseResponseStatus['status'];
  data: userController.UpdateNameData;
};
