import type { StatusOption } from '@/types/status.types';

export type Store = {
  statusOptions: StatusOption[];
  updateStatusOptions: (value: StatusOption[]) => void;
};
