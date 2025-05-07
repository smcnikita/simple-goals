export type GoalName = string;
export type GoalDescription = string;
export type GoalStatus = string;

export type Goal = {
  name: GoalName;
  description: GoalDescription;
  status: GoalStatus;
};

export type Goals = Goal[];
