'use client';

import { useCallback, useMemo, useState } from 'react';

type Props = {
  year: number;
};

const useAddGoal = ({ year }: Props) => {
  const [isShowAddGoal, setIsShowAddGoal] = useState(false);

  const updateIsShowAddGoal = useCallback((value: boolean) => setIsShowAddGoal(value), []);

  const isShowAddGoalButton = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return year === currentYear;
  }, [year]);

  return { isShowAddGoal, isShowAddGoalButton, updateIsShowAddGoal };
};

export default useAddGoal;
