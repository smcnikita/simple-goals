import type { BaseResponseStatus } from '@/types/base-controller.type';
import type { Data } from '@/controllers/user/update-user-name/types';

export type UpdateNameResponseData = {
  status: BaseResponseStatus['status'];
  data: Data;
};
