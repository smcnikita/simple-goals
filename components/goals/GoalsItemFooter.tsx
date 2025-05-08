import type { FC } from 'react';
import { Loader2, SquarePen, Trash2 } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';

import { Button } from '@/components/ui/button';

import { useGoalsStore } from '@/stores/goals-store';

type Props = {
  openUpdateForm: () => void;
  deleteGoal: () => Promise<void>;
};

const GoalsItemFooter: FC<Props> = (props) => {
  const { openUpdateForm, deleteGoal } = props;

  const { isLoadingDelete } = useGoalsStore();

  const isMobile = useIsMobile();

  return (
    <div className="flex items-center gap-3 md:gap-0">
      <Button
        size={isMobile ? 'default' : 'icon'}
        variant={isMobile ? 'secondary' : 'ghost'}
        className="cursor-pointer"
        onClick={() => openUpdateForm()}
      >
        <SquarePen />
        {isMobile && 'Edit'}
      </Button>
      <Button
        size={isMobile ? 'default' : 'icon'}
        variant={isMobile ? 'secondary' : 'ghost'}
        className="cursor-pointer"
        disabled={isLoadingDelete}
        onClick={async () => await deleteGoal()}
      >
        {isLoadingDelete ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <Trash2 />
            {isMobile && 'Delete'}
          </>
        )}
      </Button>
    </div>
  );
};

export default GoalsItemFooter;
