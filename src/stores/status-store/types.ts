import type { StatusOption } from '@/types/status/status';

export type Store = {
  statusOptions: StatusOption[];
  updateStatusOptions: (value: StatusOption[]) => void;
};
