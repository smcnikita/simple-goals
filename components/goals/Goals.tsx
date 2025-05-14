'use client';

import { useEffect, type FC } from 'react';
import { useTranslations } from 'next-intl';

import { STATUS_TOTAL } from '@/constants/statuses';

import useGoal from '@/hooks/use-goal';

import { useGoalsStore } from '@/stores/goals-store';
import { useFilterStatusStore } from '@/stores/filter-status-store';

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

type Props = {
  globalYear: number;
};

const Goals: FC<Props> = ({ globalYear }) => {
  const t = useTranslations('goals_list');

  const { filterStatusOptions, updateSelectedFilterStatus } = useFilterStatusStore();
  const { filteredGoals, goalsStatistic } = useGoal();
  const { fetchGoalsData } = useGoalsStore();

  useEffect(() => {
    if (globalYear) {
      fetchGoalsData(globalYear);
    }
  }, [globalYear, fetchGoalsData]);

  return (
    <>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">{t('title', { year: globalYear })}</h1>
          <p className="text-gray-500 text-sm mt-1">{t('description', { year: globalYear })}</p>
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue={STATUS_TOTAL.key} onValueChange={updateSelectedFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t('statuses')}</SelectLabel>
                {filterStatusOptions.map((filterStatus) => (
                  <SelectItem key={filterStatus.key} value={filterStatus.key}>
                    {t(filterStatus.key)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <CreateGoalDialog />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <GoalStatisticsItem text={t('total')} count={goalsStatistic.total} />
        <GoalStatisticsItem text={t('in_progress')} count={goalsStatistic.inProgress} />
        <GoalStatisticsItem text={t('completed')} count={goalsStatistic.completed} />
        <GoalStatisticsItem text={t('not_completed')} count={goalsStatistic.notCompleted} />
        <GoalStatisticsItem text={t('canceled')} count={goalsStatistic.canceled} />
      </div>

      <GoalsList goals={filteredGoals} />
    </>
  );
};

export default Goals;
