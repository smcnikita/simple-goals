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
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  const updateGoals = useCallback((value: GoalModel[]) => setGoals(value), []);

  const canChangeGoal = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return year === currentYear;
  }, [year]);

  const getGoals = useCallback(async () => {
    setIsGlobalLoading(true);

    try {
      const res = await httpGetGoal(year);
      const goals = await res.json();

      if (!res.ok) {
        throw new Error(goals.message);
      }

      updateGoals(goals.data);
      setIsGlobalLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Error getting goals');
    }
  }, [updateGoals, year]);

  return { goals, canChangeGoal, isGlobalLoading, getGoals, updateGoals };
};

export default useGoals;
