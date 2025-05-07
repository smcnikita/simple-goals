import { STATUS } from '@/constants/statuses';

export type StatusKeys = (typeof STATUS)[keyof typeof STATUS];

export type Status = {
  id: number;
  key: StatusKeys;
  name: string;
};

export type Statuses = Status[];
