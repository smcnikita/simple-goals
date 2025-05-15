'use client';

import { useState, type FC } from 'react';
import { Loader2, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';

import useGlobalYear from '@/hooks/use-global-year';

import { useGoalsStore } from '@/stores/goals-store';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

const GoalsSittingsDialog: FC = () => {
  const t = useTranslations('settings');

  const [openDialog, setOpenDialog] = useState(false);

  const { globalYear, isNowYear } = useGlobalYear();
  const {
    isShowStatistic,
    canEditPastGoals,
    isLoadingShowStatistic,
    isLoadingUpdateCanEditPast,
    updateCanEditPastGoals,
    updateIsShowStatistic,
  } = useGoalsStore();

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

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="ghost" size="icon">
          <Settings className="text-gray-400" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="text-start">
          <DialogTitle>{t('goals_settings', { year: globalYear })}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
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

          {!isNowYear && (
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GoalsSittingsDialog;
