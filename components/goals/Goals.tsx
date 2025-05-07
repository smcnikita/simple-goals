'use client';

import { useEffect, useMemo, useState, type FC } from 'react';

import { STATUS, STATUS_TOTAL } from '@/constants/statuses';

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
import type { Statuses, StatusKeys } from '@/types/statuses.types';

type Props = {
  year: number;
  statuses: Statuses;
};

const Goals: FC<Props> = ({ year, statuses }) => {
  const [goals, setGoals] = useState<Goals>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<StatusKeys>(STATUS_TOTAL.key);

  const [statusOptions, setStatusOptions] = useState<Statuses>([]);

  const filteredGoals = useMemo(() => {
    if (selectedStatus === STATUS.Total) {
      return goals;
    }

    return goals.filter((goal) => goal.status === selectedStatus);
  }, [goals, selectedStatus]);

  useEffect(() => {
    setStatusOptions([STATUS_TOTAL, ...statuses]);

    setGoals([]);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [statuses]);

  const onValueChange = (value: StatusKeys) => {
    setSelectedStatus(value);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">{year} Goals</h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage your goals for {year}</p>
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue={STATUS_TOTAL.key} onValueChange={onValueChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Statuses</SelectLabel>
                {statusOptions.map((el) => (
                  <SelectItem key={el.id} value={el.key}>
                    {el.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <CreateGoalDialog />
        </div>
      </div>

      <GoalsList goals={filteredGoals} isLoading={isLoading} />
    </>
  );
};

export default Goals;
