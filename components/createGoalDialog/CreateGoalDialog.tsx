import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import CreateGoalDialogContent from './CreateGoalDialogContent';

const CreateGoalDialog: FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus /> Add goal
        </Button>
      </DialogTrigger>
      <CreateGoalDialogContent />
    </Dialog>
  );
};

export default CreateGoalDialog;
