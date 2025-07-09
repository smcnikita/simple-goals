import type { GoalModelWithStatus } from './goals.types';

export type sectionsWithGoalsItem = {
  section_id: number;
  section_name: string;
  goals: GoalModelWithStatus[];
};
