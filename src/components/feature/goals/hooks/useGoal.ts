'use client';

import { useMemo } from 'react';

import type { GoalModel } from '@/models/goals-model';

type Props = {
  goals: GoalModel[];
};

const useGoal = ({ goals }: Props) => {
  const completedGoals = useMemo(() => {
    return goals
      .filter((goal) => goal.is_completed && goal.completed_at !== null)
      .sort((a, b) => new Date(a.completed_at!).getTime() - new Date(b.completed_at!).getTime());
  }, [goals]);

  const uncompletedGoals = useMemo(() => {
    return goals.filter((goal) => !goal.is_completed && goal.completed_at === null);
  }, [goals]);

  return { completedGoals, uncompletedGoals };
};

export default useGoal;
