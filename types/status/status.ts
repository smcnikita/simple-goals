import { FILTER_STATUS_KEYS, STATUS_KEYS } from '@/constants/status';

export type StatusKeys = (typeof STATUS_KEYS)[keyof typeof STATUS_KEYS];
export type FilterStatusKeys = (typeof FILTER_STATUS_KEYS)[keyof typeof FILTER_STATUS_KEYS];

export type StatusModel = {
  id: number;
  key: StatusKeys;
};

export type FilterStatusModel = {
  id: number;
  key: FilterStatusKeys;
};

export type StatusOption = {
  key: StatusKeys;
};

export type FilterStatusOption = {
  key: FilterStatusKeys;
};
