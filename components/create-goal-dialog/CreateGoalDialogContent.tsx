'use client';

import type { FC } from 'react';

import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import GoalForm from '@/components/goal-form/GoalForm';

import type { FormSchema } from '@/types/form-goal.types';
import { StatusOptionItem } from '@/types/statuses.types';

type Props = {
  statusOption: StatusOptionItem[];
};

const CreateGoalDialogContent: FC<Props> = ({ statusOption }) => {
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
        statusOption={statusOption}
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
