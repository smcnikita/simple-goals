'use client';

import { useState, type FC } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import CreateGoalDialogContent from './CreateGoalDialogContent';

const CreateGoalDialog: FC = () => {
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
      <CreateGoalDialogContent updateOpenDialog={updateOpenDialog} />
    </Dialog>
  );
};

export default CreateGoalDialog;
