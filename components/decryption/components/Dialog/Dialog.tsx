'use client';

import { useState, type FC } from 'react';

import {
  Dialog as DialogComponent,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

import Content from './Content';
import { Loader2 } from 'lucide-react';
import { removePasswordToLocalStorage } from '@/utils/cryptoHelper';
import { httpDecryptGoals } from '@/lib/api/goals';

const Dialog: FC = () => {
  const t = useTranslations('goals_list');
  const tEncryption = useTranslations('encryption');

  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    removePasswordToLocalStorage();
    await httpDecryptGoals()
      .then(() => {
        window.location.reload();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <DialogComponent open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button type="button">{tEncryption('decrypt')}</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tEncryption('decrypt')}</DialogTitle>
        </DialogHeader>

        <Content
          footer={
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">{t('close')}</Button>
              </DialogClose>
              <Button type="button" disabled={isLoading} onClick={onClick}>
                {isLoading && <Loader2 className="animate-spin" />}
                {tEncryption('decrypt')}
              </Button>
            </DialogFooter>
          }
        />
      </DialogContent>
    </DialogComponent>
  );
};

export default Dialog;
