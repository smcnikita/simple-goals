'use client';

import { useEffect, type FC } from 'react';
import { useTranslations } from 'next-intl';

import { STATUS_OPTION_TOTAL } from '@/constants/status';

import useGoal from '@/hooks/use-goal';
import useGoalYearSettings from '@/hooks/use-goal-year-settings';

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
import GoalsSettingsDialog from '@/components/goals-settings/GoalsSettingsDialog';

import GoalsList from './GoalsList';
import GoalStatisticsItem from './GoalStatisticsItem';

type Props = {
  globalYear: number;
};

const Goals: FC<Props> = ({ globalYear }) => {
  const t = useTranslations('goals_list');

  const { filterStatusOptions, updateSelectedFilterStatus } = useFilterStatusStore();
  const { filteredGoals, goalsStatistic } = useGoal();
  const { fetchGoalsData, isShowStatistic, isLoadingFetch } = useGoalsStore();
  const { isCanEditPastGoals } = useGoalYearSettings();

  useEffect(() => {
    if (globalYear) {
      fetchGoalsData(globalYear);
    }
  }, [globalYear, fetchGoalsData]);

  return (
    <>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-1">
            <h1 className="text-2xl font-bold">{t('title', { year: globalYear })}</h1>
            <GoalsSettingsDialog />
          </div>
          <p className="text-gray-500 text-sm mt-1">{t('description', { year: globalYear })}</p>
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue={STATUS_OPTION_TOTAL.key} onValueChange={updateSelectedFilterStatus}>
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

          {isCanEditPastGoals && <CreateGoalDialog />}
        </div>
      </div>

      {!isLoadingFetch && isShowStatistic && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <GoalStatisticsItem text={t('total')} count={goalsStatistic.total} />
          <GoalStatisticsItem text={t('in_progress')} count={goalsStatistic.inProgress} />
          <GoalStatisticsItem text={t('completed')} count={goalsStatistic.completed} />
          <GoalStatisticsItem text={t('not_completed')} count={goalsStatistic.notCompleted} />
          <GoalStatisticsItem text={t('canceled')} count={goalsStatistic.canceled} />
        </div>
      )}

      <GoalsList goals={filteredGoals} />
    </>
  );
};

export default Goals;
