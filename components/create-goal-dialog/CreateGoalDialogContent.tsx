'use client';

import { useState, type FC } from 'react';
import { toast } from 'sonner';

import { httpCreateGoal } from '@/lib/http/goals.http';

import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import GoalForm from '@/components/goal-form/GoalForm';

import type { FormSchema } from '@/types/form-goal.types';
import type { StatusOptionItem } from '@/types/statuses.types';
import type { GoalsWithStatusItem } from '@/types/goals.types';

type Props = {
  year: number;
  statusOption: StatusOptionItem[];
  updateOpenDialog: (isOpen: boolean) => void;
  updateGoals: (goal: GoalsWithStatusItem) => void;
};

const CreateGoalDialogContent: FC<Props> = ({ statusOption, year, updateOpenDialog, updateGoals }) => {
  const [isLoading, setIsLoading] = useState(false);

  const createGoal = async (values: FormSchema) => {
    setIsLoading(true);

    try {
      const res = await httpCreateGoal({
        name: values.name,
        description: values.description ?? undefined,
        year,
        status: values.status,
      });

      updateGoals(res.data);
    } catch (error: unknown) {
      toast.error('Error');
    } finally {
      setIsLoading(false);
      updateOpenDialog(false);
    }
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
        statusOption={statusOption}
        afterContent={
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer" disabled={isLoading}>
              Add goals
            </Button>
          </DialogFooter>
        }
      />
    </DialogContent>
  );
};

export default CreateGoalDialogContent;
