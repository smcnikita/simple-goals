import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

const useGlobalYear = () => {
  const pathname = usePathname();

  const globalYear = useMemo(() => {
    const segments = pathname.split('/');
    return Number(segments[2]);
  }, [pathname]);

  const isNowYear = useMemo<boolean>(() => {
    const nowYear = new Date().getFullYear();

    return nowYear === globalYear;
  }, [globalYear]);

  return { globalYear, isNowYear };
};

export default useGlobalYear;
