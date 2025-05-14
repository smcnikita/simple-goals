import { Messages } from 'next-intl';

import { STATUS, STATUS_DB } from '@/constants/statuses';

export type StatusKeys = (typeof STATUS)[keyof typeof STATUS];
export type StatusDBKeys = (typeof STATUS_DB)[keyof typeof STATUS_DB];

export type StatusKey = Extract<
  keyof Messages['goals_list'],
  'in_progress' | 'completed' | 'not_completed' | 'canceled' | 'total'
>;

export type Status = {
  id: number;
  key: StatusKey;
};

export type Statuses = Status[];

export type StatusOptionItem = {
  key: StatusKey;
};
