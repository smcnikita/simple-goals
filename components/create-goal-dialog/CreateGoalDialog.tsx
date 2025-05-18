'use client';

import { useState, type FC } from 'react';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import CreateGoalDialogContent from './CreateGoalDialogContent';

const CreateGoalDialog: FC = () => {
  const t = useTranslations('goals_list');

  const [openDialog, setOpenDialog] = useState(false);

  const updateOpenDialog = (isOpen: boolean) => {
    setOpenDialog(isOpen);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> {t('add_goal')}
        </Button>
      </DialogTrigger>

      <CreateGoalDialogContent updateOpenDialog={updateOpenDialog} />
    </Dialog>
  );
};

export default CreateGoalDialog;
