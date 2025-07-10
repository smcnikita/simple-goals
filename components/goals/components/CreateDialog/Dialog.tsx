'use client';

import { useState, type FC } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog as DialogComponent, DialogTrigger } from '@/components/ui/dialog';
import YearActions from '@/components/year-actions/YearActions';

import Content from './Content';

const Dialog: FC = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const updateOpenDialog = (isOpen: boolean) => {
    setOpenDialog(isOpen);
  };

  return (
    <>
      <YearActions setOpenDialogAddGoal={updateOpenDialog} />

      <DialogComponent open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button>
            <Plus />
          </Button>
        </DialogTrigger>

        <Content updateOpenDialog={updateOpenDialog} />
      </DialogComponent>
    </>
  );
};

export default Dialog;
