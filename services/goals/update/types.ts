export type UpdateParams = {
  id: number;
  userId: number;
  yearId: number;
  name: string;
  description: string | null;
  statusId: number;
  section_id: number | null;
  completedAt: Date | string | null;
};
