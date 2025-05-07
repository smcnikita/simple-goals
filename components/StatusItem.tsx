import type { FC } from 'react';
import clsx from 'clsx';

import { STATUS } from '@/constants/statuses';

import { getStatusName } from '@/utils/get-status-name';

import type { Status } from '@/types/form-goal.types';

type Props = {
  status: Status;
};

const StatusItem: FC<Props> = ({ status }) => {
  const statusName = getStatusName(status);

  return (
    <p
      className={clsx('text-xs', {
        'text-blue-500': status === STATUS.InProgress,
        'text-green-700': status === STATUS.Completed,
        'text-red-500': status === STATUS.NotCompleted,
        'text-gray-500': status === STATUS.Canceled,
      })}
    >
      {statusName}
    </p>
  );
};

export default StatusItem;
