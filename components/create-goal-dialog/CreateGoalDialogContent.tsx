'use client';

import { type FC } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

import { useGoalsStore } from '@/stores/goals-store';

import useGlobalYear from '@/hooks/use-global-year';

import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import GoalForm from '@/components/goal-form/GoalForm';

import type { FormSchema } from '@/types/form-goal.types';

type Props = {
  updateOpenDialog: (isOpen: boolean) => void;
};

const CreateGoalDialogContent: FC<Props> = ({ updateOpenDialog }) => {
  const t = useTranslations('goals_list');

  const { createGoal: createGoalStore, isLoadingCreate } = useGoalsStore();
  const { globalYear } = useGlobalYear();

  const createGoal = async (values: FormSchema) => {
    try {
      await createGoalStore({
        ...values,
        year: globalYear,
      });

      updateOpenDialog(false);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const onSubmit = async (values: FormSchema) => {
    await createGoal(values);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t('add_goal')}</DialogTitle>
      </DialogHeader>

      <GoalForm
        onSubmit={onSubmit}
        afterContent={
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">{t('close')}</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoadingCreate}>
              {t('add_goal')}
            </Button>
          </DialogFooter>
        }
      />
    </DialogContent>
  );
};

export default CreateGoalDialogContent;
