'use client';

import { useEffect, type FC } from 'react';
import { useTranslations } from 'next-intl';
import { CircleCheck, CirclePause, CircleX, Clock, List, Settings } from 'lucide-react';

import { FILTER_STATUS_KEYS, STATUS_OPTION_TOTAL } from '@/constants/status';

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
import { Button } from '@/components/ui/button';
import CreateGoalDialog from '@/components/create-goal-dialog/CreateGoalDialog';

import GoalsList from './GoalsList';
import GoalStatisticsItem from './GoalStatisticsItem';

import type { DescriptionSettings } from '@/types/description-settings.type';

type Props = {
  globalYear: number;
  descriptionSettings: DescriptionSettings;
  updateTab: () => void;
};

const Goals: FC<Props> = ({ globalYear, descriptionSettings, updateTab }) => {
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
            <Button variant="ghost" size="icon" onClick={updateTab}>
              <Settings className="text-gray-400" />
            </Button>
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
                    {filterStatus.key === FILTER_STATUS_KEYS.Total && <List size={16} className="text-zinc-600" />}
                    {filterStatus.key === FILTER_STATUS_KEYS.InProgress && (
                      <Clock size={16} className="text-blue-500" />
                    )}
                    {filterStatus.key === FILTER_STATUS_KEYS.Completed && (
                      <CircleCheck size={16} className="text-green-700" />
                    )}
                    {filterStatus.key === FILTER_STATUS_KEYS.NotCompleted && (
                      <CircleX size={16} className="text-red-500" />
                    )}
                    {filterStatus.key === FILTER_STATUS_KEYS.Canceled && (
                      <CirclePause size={16} className="text-gray-500" />
                    )}
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

      <GoalsList goals={filteredGoals} descriptionSettings={descriptionSettings} />
    </>
  );
};

export default Goals;
