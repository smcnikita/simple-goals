import { PrismaClient } from '@prisma/client';

import { createStatisticsCount } from './create-statistics-count';

const prisma = new PrismaClient();

async function main() {
  await createStatisticsCount(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
