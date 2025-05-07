import type { FC } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import CreateGoalDialogContent from './CreateGoalDialogContent';

import type { StatusOptionItem } from '@/types/statuses.types';

type Props = {
  statusOption: StatusOptionItem[];
};

const CreateGoalDialog: FC<Props> = ({ statusOption }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus /> Add goal
        </Button>
      </DialogTrigger>
      <CreateGoalDialogContent statusOption={statusOption} />
    </Dialog>
  );
};

export default CreateGoalDialog;
