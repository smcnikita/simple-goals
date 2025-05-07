import type { FC } from 'react';
import clsx from 'clsx';

import { Status } from '@/types/form-goal.types';
import { STATUS } from '@/constants/statuses';

type Props = {
  status: Status;
};

const StatusItem: FC<Props> = ({ status }) => {
  return (
    <p
      className={clsx('text-xs', {
        'text-blue-500': status === STATUS.InProgress,
        'text-green-700': status === STATUS.Completed,
        'text-red-500': status === STATUS.NotCompleted,
        'text-gray-500': status === STATUS.Canceled,
      })}
    >
      {status}
    </p>
  );
};

export default StatusItem;
