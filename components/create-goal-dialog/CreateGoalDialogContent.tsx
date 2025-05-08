'use client';

import { type FC } from 'react';

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
  const { createGoal: createGoalStore, isLoadingCreate } = useGoalsStore();
  const { globalYear } = useGlobalYear();

  const createGoal = async (values: FormSchema) => {
    await createGoalStore({
      ...values,
      year: globalYear,
    });

    updateOpenDialog(false);
  };

  const onSubmit = async (values: FormSchema) => {
    await createGoal(values);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add goal</DialogTitle>
      </DialogHeader>

      <GoalForm
        onSubmit={onSubmit}
        afterContent={
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer" disabled={isLoadingCreate}>
              Add goals
            </Button>
          </DialogFooter>
        }
      />
    </DialogContent>
  );
};

export default CreateGoalDialogContent;
