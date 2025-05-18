import { useMemo } from 'react';

import useGlobalYear from './use-global-year';

const useYear = () => {
  const { globalYear } = useGlobalYear();

  const isSelectedCurrentYear = useMemo<boolean>(() => {
    const currentYear = new Date().getFullYear();

    return globalYear === currentYear;
  }, [globalYear]);

  return { isSelectedCurrentYear };
};

export default useYear;
