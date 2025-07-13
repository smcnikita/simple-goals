import type * as userController from '@/controllers/user';

import type { BaseResponseStatus } from '@/types/controllers/base';

export type UpdateNameResponseData = {
  status: BaseResponseStatus['status'];
  data: userController.UpdateNameData;
};
