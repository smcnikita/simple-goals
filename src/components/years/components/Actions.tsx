'use client';

import { useState, type FC } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { CreateDialog } from '@/components/sections';

type Props = {
  setOpenDialogAddGoal: (value: boolean) => void;
};

const Actions: FC<Props> = ({ setOpenDialogAddGoal }) => {
  const t = useTranslations('goals_list');

  const [openDialog, setOpenDialog] = useState(false);

  const updateOpenDialog = (isOpen: boolean) => {
    setOpenDialog(isOpen);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpenDialogAddGoal(true)}>{t('add_goal')}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateOpenDialog(true)}>{t('add_section')}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <CreateDialog updateOpenDialog={updateOpenDialog} />
      </Dialog>
    </>
  );
};

export default Actions;
