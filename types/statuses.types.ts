import { STATUS, STATUS_DB } from '@/constants/statuses';

export type StatusKeys = (typeof STATUS)[keyof typeof STATUS];
export type StatusDBKeys = (typeof STATUS_DB)[keyof typeof STATUS_DB];

export type Status = {
  id: number;
  key: StatusKeys;
  name: string;
};

export type Statuses = Status[];

export type StatusOptionItem = {
  key: StatusKeys;
  name: string;
};
