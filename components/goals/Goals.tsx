'use client';

import { useCallback, useEffect, useMemo, useState, type FC } from 'react';
import { toast } from 'sonner';

import { STATUS, STATUS_TOTAL } from '@/constants/statuses';

import { httpGetGoal } from '@/lib/http/goals.http';

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
import GoalStatisticsItem from './GoalStatisticsItem';

import type { GoalsWithStatus, GoalsWithStatusItem } from '@/types/goals.types';
import type { Statuses, StatusKeys, StatusOptionItem } from '@/types/statuses.types';

type Props = {
  year: number;
  statuses: Statuses;
};

const Goals: FC<Props> = ({ year, statuses }) => {
  const [goals, setGoals] = useState<GoalsWithStatus>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<StatusKeys>(STATUS_TOTAL.key);

  const [filterOptions, setFilterOptions] = useState<Statuses>([]);

  const filteredGoals = useMemo(() => {
    if (selectedStatus === STATUS.Total) {
      return goals;
    }

    return goals.filter((goal) => goal.status === selectedStatus);
  }, [goals, selectedStatus]);

  const getGoals = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await httpGetGoal(year);
      setGoals(res.data.goals);
    } catch (error: unknown) {
      setGoals([]);
      toast.error('Error');
    } finally {
      setIsLoading(false);
    }
  }, [year]);

  const updateGoals = (goal: GoalsWithStatusItem) => {
    setGoals((prev) => [...prev, goal]);
  };

  const updateGoalData = (newValue: GoalsWithStatusItem) => {
    setGoals((prev) => {
      return prev.map((goal) => {
        if (goal.id === newValue.id) {
          return newValue;
        } else {
          return goal;
        }
      });
    });
  };

  const deleteGoals = (id: number) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  useEffect(() => {
    setFilterOptions([STATUS_TOTAL, ...statuses]);
    getGoals();
  }, [getGoals, statuses]);

  const onValueChange = (value: StatusKeys) => {
    setSelectedStatus(value);
  };

  const statusOption = useMemo<StatusOptionItem[]>(() => {
    return statuses.map((status) => ({
      key: status.key,
      name: status.name,
    }));
  }, [statuses]);

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
                {filterOptions.map((el) => (
                  <SelectItem key={el.id} value={el.key}>
                    {el.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <CreateGoalDialog statusOption={statusOption} year={year} updateGoals={updateGoals} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <GoalStatisticsItem text="Total" count={goals.length} />
        <GoalStatisticsItem text="In Progress" count={goals.filter((el) => el.status === STATUS.InProgress).length} />
        <GoalStatisticsItem text="Completed" count={goals.filter((el) => el.status === STATUS.Completed).length} />
        <GoalStatisticsItem
          text="Not Completed"
          count={goals.filter((el) => el.status === STATUS.NotCompleted).length}
        />
        <GoalStatisticsItem text="Canceled" count={goals.filter((el) => el.status === STATUS.Canceled).length} />
      </div>

      <GoalsList
        year={year}
        goals={filteredGoals}
        isLoading={isLoading}
        statusOption={statusOption}
        deleteGoals={deleteGoals}
        updateGoals={updateGoalData}
      />
    </>
  );
};

export default Goals;
