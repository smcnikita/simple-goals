import { useMemo } from 'react';

import { useUserYearsStore } from '@/stores/user-years-store';

const useUserYears = () => {
  const { userYears } = useUserYearsStore();

  const hasNextYear = useMemo<boolean>(() => {
    const currentYear = new Date().getFullYear();
    return userYears.includes(currentYear + 1);
  }, [userYears]);

  return { hasNextYear };
};

export default useUserYears;
