import type { FilterStatusModel } from '@/types/status.types';

export const STATUS_KEYS = {
  InProgress: 'in_progress',
  Completed: 'completed',
  NotCompleted: 'not_completed',
  Canceled: 'canceled',
} as const;

export const FILTER_STATUS_KEYS = {
  ...STATUS_KEYS,
  Total: 'total',
} as const;

export const STATUS_OPTION_TOTAL: FilterStatusModel = {
  id: -1,
  key: FILTER_STATUS_KEYS.Total,
} as const;
