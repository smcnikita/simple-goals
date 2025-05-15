import type { FC } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { FILTER_STATUS_KEYS } from '@/constants/status';

import type { StatusKeys } from '@/types/status.types';

type Props = {
  status: StatusKeys;
};

const StatusItem: FC<Props> = ({ status }) => {
  const t = useTranslations('goals_list');

  return (
    <p
      className={clsx('text-xs', {
        'text-blue-500': status === FILTER_STATUS_KEYS.InProgress,
        'text-green-700': status === FILTER_STATUS_KEYS.Completed,
        'text-red-500': status === FILTER_STATUS_KEYS.NotCompleted,
        'text-gray-500': status === FILTER_STATUS_KEYS.Canceled,
      })}
    >
      {t(status)}
    </p>
  );
};

export default StatusItem;
