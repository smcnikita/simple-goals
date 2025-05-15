import type { StatusKeys } from '@/types/status.types';

export type UpdateGoalParams = {
  id: number;
  userId: number;
  yearId: number;
  name: string;
  description: string | null;
  statusKey: StatusKeys;
};
