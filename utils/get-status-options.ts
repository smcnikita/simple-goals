import type { Statuses } from '@/types/statuses.types';

const getStatusOptions = (statuses: Statuses) => {
  return statuses.map((status) => ({
    key: status.key,
    name: status.name,
  }));
};

export default getStatusOptions;
