'use client';

import type { FC } from 'react';
import { Loader2, SquarePen, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useIsMobile } from '@/hooks/use-mobile';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type Props = {
  isLoadingDelete: boolean;
  openUpdateForm: () => void;
  deleteGoal: () => Promise<void>;
};

const Footer: FC<Props> = (props) => {
  const { isLoadingDelete, openUpdateForm, deleteGoal } = props;

  const t = useTranslations('goals_list');

  const isMobile = useIsMobile();

  return (
    <div className="flex items-center gap-3 md:gap-0">
      <Button
        size={isMobile ? 'default' : 'icon'}
        variant={isMobile ? 'secondary' : 'ghost'}
        disabled={isLoadingDelete}
        onClick={() => openUpdateForm()}
      >
        <SquarePen />
        {isMobile && t('short_edit_goal')}
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size={isMobile ? 'default' : 'icon'}
            variant={isMobile ? 'secondary' : 'ghost'}
            disabled={isLoadingDelete}
          >
            {isLoadingDelete ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Trash2 />
                {isMobile && t('short_delete_goal')}
              </>
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('are_you_sure')}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={async () => await deleteGoal()}>{t('short_delete_goal')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Footer;
