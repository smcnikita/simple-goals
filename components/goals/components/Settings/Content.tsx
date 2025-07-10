'use client';

import { type FC } from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import useGlobalYear from '@/hooks/use-global-year';
import useUserYears from '@/hooks/use-user-years';
import useYear from '@/hooks/use-year';

import { useGoalsStore } from '@/stores/goals-store';
import { useUserYearsStore } from '@/stores/user-years-store';
import { markAllAsIncompleteStore } from '@/stores/mark-all-as-incomplete-store';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const GoalsSettingsContent: FC = () => {
  const t = useTranslations('settings');

  const { globalYear, isNowYear } = useGlobalYear();

  const {
    isShowStatistic,
    canEditPastGoals,
    isLoadingShowStatistic,
    isLoadingUpdateCanEditPast,
    setGoals,
    updateCanEditPastGoals,
    updateIsShowStatistic,
  } = useGoalsStore();

  const { isLoading: isLoadingMarkAllAsIncomplete, markAllAsIncomplete } = markAllAsIncompleteStore();

  const { isLoadingCreateNextYear, createNextYear } = useUserYearsStore();
  const { hasNextYear } = useUserYears();
  const { isSelectedCurrentYear } = useYear();

  const onChangeIsShowStatistic = async () => {
    if (isLoadingShowStatistic) {
      return;
    }
    await updateIsShowStatistic(globalYear);
  };

  const onChangeCanEditPast = async () => {
    if (isLoadingUpdateCanEditPast) {
      return;
    }
    await updateCanEditPastGoals(globalYear);
  };

  const handleCreateNextYear = async () => {
    await createNextYear();
    toast.success(t('next_year_is_set_up'));
  };

  const handleMarkAllAsIncomplete = async () => {
    const newGoals = await markAllAsIncomplete(globalYear);
    setGoals(newGoals);
    toast.success(t('update_successful'));
  };

  return (
    <div className="space-y-4 py-4">
      <Separator />

      {isSelectedCurrentYear && !hasNextYear && (
        <>
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Button variant="outline" disabled={isLoadingCreateNextYear} onClick={handleCreateNextYear}>
                {isLoadingCreateNextYear && <Loader2 className="animate-spin text-gray-400" />}
                {t('create_next_year')}
              </Button>
            </div>
            <p className="text-sm text-gray-500">{t('year_creation', { year: globalYear })}</p>
          </div>
          <Separator />
        </>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex items-center space-x-2">
          <Button variant="outline" disabled={isLoadingMarkAllAsIncomplete} onClick={handleMarkAllAsIncomplete}>
            {isLoadingMarkAllAsIncomplete && <Loader2 className="animate-spin text-gray-400" />}
            {t('mark_all_as_incomplete')}
          </Button>
        </div>
        <p className="text-sm text-gray-500">{t('tasks_status_change')}</p>
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <div className="flex items-center space-x-2">
          {isLoadingShowStatistic && <Loader2 className="animate-spin text-gray-400" />}
          <Checkbox
            id="show-statistic"
            checked={isShowStatistic}
            onCheckedChange={onChangeIsShowStatistic}
            disabled={isLoadingShowStatistic}
          />
          <Label htmlFor="show-statistic">{t('show_statistic')}</Label>
        </div>
        <p className="text-sm text-gray-500">{t('statistics_display_control')}</p>
      </div>

      {!isNowYear && (
        <>
          <Separator />
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              {isLoadingUpdateCanEditPast && <Loader2 className="animate-spin text-gray-400" />}
              <Checkbox
                id="can-edit-past-goals"
                checked={canEditPastGoals}
                onCheckedChange={onChangeCanEditPast}
                disabled={isLoadingUpdateCanEditPast}
              />
              <Label htmlFor="can-edit-past-goals">{t('can_edit_past_goals')}</Label>
            </div>
            <p className="text-sm text-gray-500">{t('goals_edit_control')}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default GoalsSettingsContent;
