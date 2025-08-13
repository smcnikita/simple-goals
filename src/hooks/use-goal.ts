import { useMemo } from 'react';

import { FILTER_STATUS_KEYS } from '@/constants/status';

import { useFilterStatusStore } from '@/stores/filter-status-store';
import { useGoalsStore } from '@/stores/goals-store';

const useGoal = () => {
  const { selectedFilterStatus } = useFilterStatusStore();
  const { goals } = useGoalsStore();

  const filteredGoals = useMemo(() => {
    if (selectedFilterStatus === FILTER_STATUS_KEYS.Total) {
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
        case FILTER_STATUS_KEYS.InProgress:
          stats.inProgress++;
          break;
        case FILTER_STATUS_KEYS.Completed:
          stats.completed++;
          break;
        case FILTER_STATUS_KEYS.NotCompleted:
          stats.notCompleted++;
          break;
        case FILTER_STATUS_KEYS.Canceled:
          stats.canceled++;
          break;
      }
    }

    return stats;
  }, [goals]);

  return { filteredGoals, goalsStatistic };
};

export default useGoal;
