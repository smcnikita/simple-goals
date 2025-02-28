'use client';

import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import type { GoalModel } from '@/models/goals-model';

import { httpGetGoal, httpGetGoalMonth } from '@/lib/http/goals';

type Props = {
  year: number;
  month?: string;
};

const useGoals = ({ year, month }: Props) => {
  const [goals, setGoals] = useState<GoalModel[]>([]);
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const updateIsGlobalLoading = useCallback((value: boolean) => setIsGlobalLoading(value), []);
  const updateIsLoading = useCallback((value: boolean) => setIsLoading(value), []);

  const updateGoals = useCallback((value: GoalModel[]) => setGoals(value), []);

  const canChangeGoal = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return year === currentYear;
  }, [year]);

  const getGoals = useCallback(async () => {
    try {
      const res = month ? await httpGetGoalMonth(year, month) : await httpGetGoal(year);
      const goals = await res.json();

      if (!res.ok) {
        toast.error(goals.message);
        throw new Error(goals.message);
      }

      updateGoals(goals.data);
    } catch (error) {}
  }, [month, updateGoals, year]);

  return {
    goals,
    canChangeGoal,
    isGlobalLoading,
    isLoading,
    updateIsLoading,
    getGoals,
    updateIsGlobalLoading,
    updateGoals,
  };
};

export default useGoals;
