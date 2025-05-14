import type { FC } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { STATUS } from '@/constants/statuses';

import type { Status } from '@/types/form-goal.types';

type Props = {
  status: Status;
};

const StatusItem: FC<Props> = ({ status }) => {
  const t = useTranslations('goals_list');

  return (
    <p
      className={clsx('text-xs', {
        'text-blue-500': status === STATUS.InProgress,
        'text-green-700': status === STATUS.Completed,
        'text-red-500': status === STATUS.NotCompleted,
        'text-gray-500': status === STATUS.Canceled,
      })}
    >
      {t(status)}
    </p>
  );
};

export default StatusItem;
