'use client';

import type { FC } from 'react';
import { Loader2, SquarePen, Trash2 } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';

import { Button } from '@/components/ui/button';

import { useGoalsStore } from '@/stores/goals-store';
import { useTranslations } from 'next-intl';

type Props = {
  openUpdateForm: () => void;
  deleteGoal: () => Promise<void>;
};

const GoalsItemFooter: FC<Props> = (props) => {
  const { openUpdateForm, deleteGoal } = props;

  const t = useTranslations('goals_list');

  const { isLoadingDelete } = useGoalsStore();

  const isMobile = useIsMobile();

  return (
    <div className="flex items-center gap-3 md:gap-0">
      <Button
        size={isMobile ? 'default' : 'icon'}
        variant={isMobile ? 'secondary' : 'ghost'}
        onClick={() => openUpdateForm()}
      >
        <SquarePen />
        {isMobile && t('short_edit_goal')}
      </Button>
      <Button
        size={isMobile ? 'default' : 'icon'}
        variant={isMobile ? 'secondary' : 'ghost'}
        disabled={isLoadingDelete}
        onClick={async () => await deleteGoal()}
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
    </div>
  );
};

export default GoalsItemFooter;
