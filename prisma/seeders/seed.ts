import { PrismaClient } from '@prisma/client';

import { createStatuses } from './create-statuses.seeder';
import { createDescriptionSettings } from './create-description-settings.seeder';

const prisma = new PrismaClient();

async function main() {
  await createStatuses();
  await createDescriptionSettings();
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
