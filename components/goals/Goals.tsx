'use client';

import { useEffect, type FC } from 'react';

import { STATUS_TOTAL } from '@/constants/statuses';
import useGoal from '@/hooks/use-goal';
import useFilterStatus from '@/hooks/use-filter-status';

import getStatusOptions from '@/utils/get-status-options';

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

import type { Statuses } from '@/types/statuses.types';

type Props = {
  year: number;
  statuses: Statuses;
};

const Goals: FC<Props> = ({ year, statuses }) => {
  const { selectedFilter, filterOptions, updateSelectedStatus } = useFilterStatus(statuses);
  const statusOption = getStatusOptions(statuses);

  const { isLoading, filteredGoals, goalsStatistic, getGoals, addGoal, deleteGoals, updateGoal } = useGoal({
    year,
    selectedFilter,
  });

  useEffect(() => {
    getGoals();
  }, [getGoals]);

  return (
    <>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">{year} Goals</h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage your goals for {year}</p>
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue={STATUS_TOTAL.key} onValueChange={updateSelectedStatus}>
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
          <CreateGoalDialog statusOption={statusOption} year={year} updateGoals={addGoal} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <GoalStatisticsItem text="Total" count={goalsStatistic.total} />
        <GoalStatisticsItem text="In Progress" count={goalsStatistic.inProgress} />
        <GoalStatisticsItem text="Completed" count={goalsStatistic.completed} />
        <GoalStatisticsItem text="Not Completed" count={goalsStatistic.notCompleted} />
        <GoalStatisticsItem text="Canceled" count={goalsStatistic.canceled} />
      </div>

      <GoalsList
        year={year}
        goals={filteredGoals}
        isLoading={isLoading}
        statusOption={statusOption}
        deleteGoals={deleteGoals}
        updateGoals={updateGoal}
      />
    </>
  );
};

export default Goals;
