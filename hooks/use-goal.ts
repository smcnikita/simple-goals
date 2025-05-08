import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { STATUS } from '@/constants/statuses';

import { httpGetGoal } from '@/lib/http/goals.http';

import type { GoalsWithStatus, GoalsWithStatusItem } from '@/types/goals.types';
import type { StatusKeys } from '@/types/statuses.types';

type Props = {
  selectedFilter: StatusKeys;
  year: number;
};

const useGoal = ({ selectedFilter, year }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [goals, setGoals] = useState<GoalsWithStatus>([]);

  const filteredGoals = useMemo(() => {
    if (selectedFilter === STATUS.Total) {
      return goals;
    }

    return goals.filter((goal) => goal.status === selectedFilter);
  }, [goals, selectedFilter]);

  const goalsStatistic = useMemo(() => {
    const stats = {
      total: goals.length,
      inProgress: 0,
      completed: 0,
      notCompleted: 0,
      canceled: 0,
    };

    for (const goal of goals) {
      switch (goal.status) {
        case STATUS.InProgress:
          stats.inProgress++;
          break;
        case STATUS.Completed:
          stats.completed++;
          break;
        case STATUS.NotCompleted:
          stats.notCompleted++;
          break;
        case STATUS.Canceled:
          stats.canceled++;
          break;
      }
    }

    return stats;
  }, [goals, STATUS]);

  const getGoals = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await httpGetGoal(year);
      setGoals(res.data.goals);
    } catch (error: unknown) {
      setGoals([]);
      toast.error('Error');
    } finally {
      setIsLoading(false);
    }
  }, [year]);

  const addGoal = (newGoal: GoalsWithStatusItem) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  const updateGoal = (updatedGoal: GoalsWithStatusItem) => {
    setGoals((prevGoals) => prevGoals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)));
  };

  const deleteGoals = (id: number) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  return { isLoading, filteredGoals, goalsStatistic, getGoals, addGoal, updateGoal, deleteGoals };
};

export default useGoal;
