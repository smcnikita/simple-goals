import type { Status } from '@/types/statuses.types';
import { getStatusName } from '@/utils/get-status-name';

export enum STATUS {
  InProgress = 'in_progress',
  Completed = 'completed',
  NotCompleted = 'not_completed',
  Canceled = 'canceled',
  Total = 'total',
}

export const STATUS_TOTAL: Status = {
  id: -1,
  key: STATUS.Total,
  name: getStatusName(STATUS.Total),
};
