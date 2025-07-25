import type { StatusKeys } from '@/types/status/status';

export type UpdateParams = {
  id: number;
  userId: number;
  yearId: number;
  name: string;
  description: string | null;
  statusKey: StatusKeys;
  section_id: number | null;
};
