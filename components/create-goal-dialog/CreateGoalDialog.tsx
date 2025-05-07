'use client';

import { useState, type FC } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import CreateGoalDialogContent from './CreateGoalDialogContent';

import type { StatusOptionItem } from '@/types/statuses.types';
import type { GoalsWithStatusItem } from '@/types/goals.types';

type Props = {
  year: number;
  statusOption: StatusOptionItem[];
  updateGoals: (goal: GoalsWithStatusItem) => void;
};

const CreateGoalDialog: FC<Props> = ({ statusOption, year, updateGoals }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const updateOpenDialog = (isOpen: boolean) => {
    setOpenDialog(isOpen);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus /> Add goal
        </Button>
      </DialogTrigger>
      <CreateGoalDialogContent
        statusOption={statusOption}
        year={year}
        updateOpenDialog={updateOpenDialog}
        updateGoals={updateGoals}
      />
    </Dialog>
  );
};

export default CreateGoalDialog;
