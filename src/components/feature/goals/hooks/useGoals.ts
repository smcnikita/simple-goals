'use client';

import { useCallback, useMemo, useState } from 'react';

import type { GoalModel } from '@/models/goals-model';

type Props = {
  year: number;
};

const useGoals = ({ year }: Props) => {
  const [goals, setGoals] = useState<GoalModel[]>([]);

  const updateGoals = useCallback((value: GoalModel[]) => setGoals(value), []);

  const canChangeGoal = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return year === currentYear;
  }, [year]);

  return { goals, canChangeGoal, updateGoals };
};

export default useGoals;
