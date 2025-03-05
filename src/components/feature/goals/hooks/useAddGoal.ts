'use client';

import { useCallback, useMemo, useState } from 'react';

type Props = {
  year: number;
  month?: string;
};

const useAddGoal = ({ year, month }: Props) => {
  const [isShowAddGoal, setIsShowAddGoal] = useState(false);

  const updateIsShowAddGoal = useCallback((value: boolean) => setIsShowAddGoal(value), []);

  const isShowAddGoalButton = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const nowMonth = new Date().getMonth() + 1;

    if (month === undefined) {
      return year === currentYear;
    }

    return year === currentYear && nowMonth <= Number(month);
  }, [month, year]);

  return { isShowAddGoal, isShowAddGoalButton, updateIsShowAddGoal };
};

export default useAddGoal;
