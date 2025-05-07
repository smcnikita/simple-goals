import type { FC } from 'react';
import clsx from 'clsx';

import { Status } from '@/types/form-goal.types';

type Props = {
  status: Status;
};

const StatusItem: FC<Props> = ({ status }) => {
  return (
    <p
      className={clsx('text-xs', {
        'text-blue-500': status === 'In Progress',
        'text-green-700': status === 'Completed',
        'text-red-500': status === 'Not Completed',
        'text-gray-500': status === 'Canceled',
      })}
    >
      {status}
    </p>
  );
};

export default StatusItem;
