'use client';

import { useEffect, useState, type FC } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CreateGoalDialog from '@/components/create-goal-dialog/CreateGoalDialog';

import GoalsList from './GoalsList';

import type { Goals } from '@/types/goals.types';

type Props = {
  year: number;
};

const data = [
  {
    count: 7,
    status: 'Total',
  },
  {
    count: 2,
    status: 'In Progress',
  },
  {
    count: 3,
    status: 'Completed',
  },
  {
    count: 1,
    status: 'Not Completed',
  },
  {
    count: 1,
    status: 'Canceled',
  },
];

const Goals: FC<Props> = ({ year }) => {
  const [goals, setGoals] = useState<Goals>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setGoals([]);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">{year} Goals</h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage your goals for {year}</p>
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue="Total">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Statuses</SelectLabel>
                {data.map((el) => (
                  <SelectItem key={el.status} value={el.status}>
                    {el.status === 'Total' ? 'All goals' : el.status}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <CreateGoalDialog />
        </div>
      </div>

      <GoalsList goals={goals} isLoading={isLoading} />
    </>
  );
};

export default Goals;
