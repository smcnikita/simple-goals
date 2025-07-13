import type { StatusKeys } from '@/types/status/status';

export type CreateGoalParams = {
  userId: number;
  yearId: number;
  year: number;
  name: string;
  description: string | null;
  statusKey: StatusKeys;
  canEditPastGoals: boolean;
  section_id: number | null;
};
