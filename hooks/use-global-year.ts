import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

const useGlobalYear = () => {
  const pathname = usePathname();

  const globalYear = useMemo(() => {
    const segments = pathname.split('/');
    return Number(segments[2]);
  }, [pathname]);

  return { globalYear };
};

export default useGlobalYear;
