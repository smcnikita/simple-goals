import { useGoalsStore } from '@/stores/goals-store';
import { useMemo } from 'react';
import useGlobalYear from './use-global-year';

const useGoalYearSettings = () => {
  const { canEditPastGoals } = useGoalsStore();
  const { globalYear } = useGlobalYear();

  const isCanEditPastGoals = useMemo<boolean>(() => {
    const nowYear = new Date().getFullYear();

    if (globalYear === nowYear) {
      return true;
    }

    return canEditPastGoals;
  }, [canEditPastGoals, globalYear]);

  return { isCanEditPastGoals };
};

export default useGoalYearSettings;
