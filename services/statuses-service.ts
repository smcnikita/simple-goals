import { prisma } from '@/lib/prisma';

import { getStatusName } from '@/utils/get-status-name';

import type { Statuses } from '@/types/statuses.types';

export async function getStatuses(): Promise<Statuses> {
  const statuses = await prisma.statuses.findMany();

  return statuses.map((status) => {
    return {
      id: status.id,
      key: status.key,
      name: getStatusName(status.key),
    };
  });
}
