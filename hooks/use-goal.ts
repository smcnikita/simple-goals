import { useMemo } from 'react';

import { STATUS } from '@/constants/statuses';

import { useFilterStatusStore } from '@/stores/filter-status-store';
import { useGoalsStore } from '@/stores/goals-store';

const useGoal = () => {
  const { selectedFilterStatus } = useFilterStatusStore();
  const { goals } = useGoalsStore();

  const filteredGoals = useMemo(() => {
    if (selectedFilterStatus === STATUS.Total) {
      return goals;
    }

    return goals.filter((goal) => goal.status === selectedFilterStatus);
  }, [goals, selectedFilterStatus]);

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

  return { filteredGoals, goalsStatistic };
};

export default useGoal;
