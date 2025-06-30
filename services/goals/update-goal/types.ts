export type UpdateGoalParams = {
  id: number;
  userId: number;
  yearId: number;
  name: string;
  description: string | null;
  statusId: number;
  section_id: number | null;
};
