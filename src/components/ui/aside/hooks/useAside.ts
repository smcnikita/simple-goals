'use client';

import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';

import { LOCAL_STORAGE_YEARS_KEY } from '@/constants/localstorage';

import { httpGetYears } from '@/lib/http/years';

const useAside = (defaultYears: number[]) => {
  const [isLoading, setIsLoading] = useState(true);
  const [years, setYears] = useState<number[]>(defaultYears);

  const updateYears = useCallback((newYears: number[]) => {
    setYears(newYears);
    localStorage.setItem(LOCAL_STORAGE_YEARS_KEY, JSON.stringify(newYears));
  }, []);

  const fetchYears = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await httpGetYears().then((res) => res.json());
      const uniqueSortedYears = Array.from(new Set([...defaultYears, ...data])).sort((a, b) => b - a);
      updateYears(uniqueSortedYears);
    } catch (error) {
      toast.error('Failed to fetch years');
      await signOut();
      console.error('Failed to fetch years:', error);
    } finally {
      setIsLoading(false);
    }
  }, [defaultYears, updateYears]);

  return { isLoading, years, fetchYears, updateYears };
};

export default useAside;
