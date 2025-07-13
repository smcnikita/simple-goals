import type { StatusKeys } from '../status/status';

export type Name = string;
export type Description = string | null;

export type FormSchema = {
  name: Name;
  description: Description;
  status: StatusKeys;
  section_id: number | null;
};
