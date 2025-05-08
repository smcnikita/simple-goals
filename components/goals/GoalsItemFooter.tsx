import type { FC } from 'react';
import { Loader2, SquarePen, Trash2 } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';

import { Button } from '@/components/ui/button';

type Props = {
  isLoading: boolean;
  openUpdateForm: () => void;
  deleteGoal: () => Promise<void>;
};

const GoalsItemFooter: FC<Props> = (props) => {
  const { isLoading, openUpdateForm, deleteGoal } = props;

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
        disabled={isLoading}
        onClick={async () => await deleteGoal()}
      >
        {isLoading ? (
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
