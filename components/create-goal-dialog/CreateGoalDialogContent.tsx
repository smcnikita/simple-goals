'use client';

import type { FC } from 'react';

import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import GoalForm from '@/components/goal-form/GoalForm';

import type { FormSchema } from '@/types/form-goal.types';

const CreateGoalDialogContent: FC = () => {
  const onSubmit = async (values: FormSchema) => {
    console.log(values);
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
            <Button type="submit" className="cursor-pointer">
              Add goals
            </Button>
          </DialogFooter>
        }
      />
    </DialogContent>
  );
};

export default CreateGoalDialogContent;
