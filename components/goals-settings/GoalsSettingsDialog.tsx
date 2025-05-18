'use client';

import { useState, type FC } from 'react';
import { Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';

import useGlobalYear from '@/hooks/use-global-year';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import SettingsContent from './SettingsContent';

const GoalsSettingsDialog: FC = () => {
  const t = useTranslations('settings');

  const [openDialog, setOpenDialog] = useState(false);

  const updateOpenDialog = (value: boolean) => {
    setOpenDialog(value);
  };

  const { globalYear } = useGlobalYear();

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="text-gray-400" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="text-start">
          <DialogTitle>{t('goals_settings', { year: globalYear })}</DialogTitle>
        </DialogHeader>
        <SettingsContent updateOpenDialog={updateOpenDialog} />
      </DialogContent>
    </Dialog>
  );
};

export default GoalsSettingsDialog;
