import { type FC } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { FILTER_STATUS_KEYS } from '@/constants/status';

import type { StatusKeys } from '@/types/status/status';
import useDate from '@/hooks/use-date';

type Props = {
  status: StatusKeys;
  completedAt?: string | null;
};

const StatusItem: FC<Props> = ({ status, completedAt }) => {
  const t = useTranslations('goals_list');
  const { transformDate } = useDate(completedAt);

  return (
    <p
      className={clsx('text-xs flex flex-col gap-1', {
        'text-blue-500': status === FILTER_STATUS_KEYS.InProgress,
        'text-green-700': status === FILTER_STATUS_KEYS.Completed,
        'text-red-500': status === FILTER_STATUS_KEYS.NotCompleted,
        'text-gray-500': status === FILTER_STATUS_KEYS.Canceled,
      })}
    >
      {t(status)}
      {status === FILTER_STATUS_KEYS.Completed && transformDate && (
        <span className="text-gray-500"> ({transformDate})</span>
      )}
    </p>
  );
};

export default StatusItem;
