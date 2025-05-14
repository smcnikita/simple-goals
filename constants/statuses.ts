import type { Status, StatusKey } from '@/types/statuses.types';

export const STATUS_DB: { [key: string]: StatusKey } = {
  InProgress: 'in_progress',
  Completed: 'completed',
  NotCompleted: 'not_completed',
  Canceled: 'canceled',
} as const;

export const STATUS: { [key: string]: StatusKey } = {
  ...STATUS_DB,
  Total: 'total',
} as const;

export const STATUS_TOTAL: Status = {
  id: -1,
  key: STATUS.Total,
};
