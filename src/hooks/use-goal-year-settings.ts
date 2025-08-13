import { useMemo } from 'react';

import { useGoalsStore } from '@/stores/goals-store';

import useYear from './use-year';

const useGoalYearSettings = () => {
  const { canEditPastGoals } = useGoalsStore();
  const { isSelectedCurrentYear } = useYear();

  const isCanEditPastGoals = useMemo<boolean>(() => {
    if (isSelectedCurrentYear) {
      return true;
    }

    return canEditPastGoals;
  }, [canEditPastGoals, isSelectedCurrentYear]);

  return { isCanEditPastGoals };
};

export default useGoalYearSettings;
