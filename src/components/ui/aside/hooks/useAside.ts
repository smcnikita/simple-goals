'use client';

import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

import { LOCAL_STORAGE_YEARS_KEY } from '@/constants/localstorage';
import { MONTHS } from '@/constants/months';

import { httpGetYears } from '@/lib/http/years';

import type { MonthKey } from '@/types/month';

type YearItem = {
  year: number;
  months?: MonthKey[];
};

const useAside = (defaultYears: number[]) => {
  const [isLoading, setIsLoading] = useState(true);
  const [years, setYears] = useState<YearItem[]>([]);

  const pathname = usePathname();

  const selectedYear = useMemo(() => {
    const segments = pathname.split('/');

    if (segments.length === 3) {
      return {
        year: Number(segments[2]),
        month: null,
      };
    }

    return {
      year: Number(segments[2]),
      month: segments[3],
    };
  }, [pathname]);

  const updateYears = useCallback((newYears: YearItem[]) => {
    setYears(newYears);
    localStorage.setItem(LOCAL_STORAGE_YEARS_KEY, JSON.stringify(newYears));
  }, []);

  const fetchYears = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await httpGetYears().then((res) => res.json());
      const uniqueSortedYears: number[] = Array.from(new Set([...defaultYears, ...data])).sort((a, b) => b - a);
      const existingYears: YearItem[] = uniqueSortedYears.map((item) => {
        if (item === selectedYear.year) {
          return { year: item, months: MONTHS };
        }
        return { year: item };
      });
      updateYears(existingYears);
    } catch (error) {
      toast.error('Failed to fetch years');
      await signOut();
      console.error('Failed to fetch years:', error);
    } finally {
      setIsLoading(false);
    }
  }, [defaultYears, selectedYear, updateYears]);

  return { isLoading, years, selectedYear, fetchYears, updateYears };
};

export default useAside;
