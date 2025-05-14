import type { Status, StatusKey } from '@/types/statuses.types';

export const STATUS_DB: Record<string, StatusKey> = {
  InProgress: 'in_progress',
  Completed: 'completed',
  NotCompleted: 'not_completed',
  Canceled: 'canceled',
};

export const STATUS: Record<string, StatusKey> = {
  ...STATUS_DB,
  Total: 'total',
};

export const STATUS_TOTAL: Status = {
  id: -1,
  key: STATUS.Total,
};
