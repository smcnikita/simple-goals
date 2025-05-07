import { PrismaClient } from '@prisma/client';

import { createStatuses } from './create-statuses.seeder';

const prisma = new PrismaClient();

async function main() {
  await createStatuses();
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
