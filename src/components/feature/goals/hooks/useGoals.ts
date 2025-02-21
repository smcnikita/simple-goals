'use client';

import { useCallback, useMemo, useState } from 'react';

import type { GoalModel } from '@/models/goals-model';

import { httpGetGoal } from '@/lib/http/goals';
import toast from 'react-hot-toast';

type Props = {
  year: number;
};

const useGoals = ({ year }: Props) => {
  const [goals, setGoals] = useState<GoalModel[]>([]);
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);

  const updateIsGlobalLoading = useCallback((value: boolean) => setIsGlobalLoading(value), []);

  const updateGoals = useCallback((value: GoalModel[]) => setGoals(value), []);

  const canChangeGoal = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return year === currentYear;
  }, [year]);

  const getGoals = useCallback(async () => {
    try {
      const res = await httpGetGoal(year);
      const goals = await res.json();

      if (!res.ok) {
        toast.error(goals.message);
        throw new Error(goals.message);
      }

      updateGoals(goals.data);
    } catch (error) {}
  }, [updateGoals, year]);

  return { goals, canChangeGoal, isGlobalLoading, getGoals, updateIsGlobalLoading, updateGoals };
};

export default useGoals;
