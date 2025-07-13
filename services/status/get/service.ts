import { prisma } from '@/lib/prisma/prisma';

import type { StatusModel, StatusKeys } from '@/types/status.types';

export async function getStatuses(): Promise<StatusModel[]> {
  const statuses = await prisma.statuses.findMany();

  return statuses.map((status) => {
    return {
      id: status.id,
      key: status.key as StatusKeys,
    };
  });
}
