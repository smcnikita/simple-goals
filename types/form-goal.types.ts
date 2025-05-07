import type { StatusKeys } from './statuses.types';

export type Name = string;
export type Description = string | null;
export type Status = StatusKeys;

export type FormSchema = {
  name: Name;
  description: Description;
  status: Status;
};
