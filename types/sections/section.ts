import type { GoalModelWithStatus } from '../goals/goal';

export type SectionsWithGoalsItem = {
  section_id: number;
  section_name: string;
  goals: GoalModelWithStatus[];
};
