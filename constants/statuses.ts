import { getStatusName } from '@/utils/get-status-name';

import type { Status } from '@/types/statuses.types';

export const STATUS_DB = {
  InProgress: 'in_progress',
  Completed: 'completed',
  NotCompleted: 'not_completed',
  Canceled: 'canceled',
};

export const STATUS = {
  ...STATUS_DB,
  Total: 'total',
};

export const STATUS_TOTAL: Status = {
  id: -1,
  key: STATUS.Total,
  name: getStatusName(STATUS.Total),
};
