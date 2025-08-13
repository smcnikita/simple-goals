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

const Dialog: FC = () => {
  const t = useTranslations('goals_list');
  const tEncryption = useTranslations('encryption');

  const [openDialog, setOpenDialog] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  return (
    <DialogComponent open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          {tEncryption('encrypt')}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tEncryption('setPassword')}</DialogTitle>
        </DialogHeader>

        <Content
          isLoading={isLoadingCreate}
          updateIsLoading={setIsLoadingCreate}
          footer={
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">{t('close')}</Button>
              </DialogClose>
              <Button type="submit" disabled={isLoadingCreate}>
                {isLoadingCreate && <Loader2 className="animate-spin" />}
                {tEncryption('encrypt')}
              </Button>
            </DialogFooter>
          }
        />
      </DialogContent>
    </DialogComponent>
  );
};

export default Dialog;
