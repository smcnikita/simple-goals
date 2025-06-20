import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const VALUE = {
  display_none: 'display_none',
  display_3_lines: 'display_3_lines',
  display_full: 'display_full',
};

export const createDescriptionSettings = async () => {
  let descriptionSettings = await prisma.descriptionSettings.findMany();

  const displayNoneDescription = descriptionSettings.find((el) => el.value === VALUE.display_none);

  if (!displayNoneDescription) {
    await prisma.descriptionSettings.create({ data: { value: VALUE.display_none } });
    console.log('-> The description settings "display_none" has been created');
  }

  const display3LinesDescription = descriptionSettings.find((el) => el.value === VALUE.display_3_lines);

  if (!display3LinesDescription) {
    await prisma.descriptionSettings.create({ data: { value: VALUE.display_3_lines } });
    console.log('-> The description settings "display_3_lines" has been created');
  }

  const displayFullDescription = descriptionSettings.find((el) => el.value === VALUE.display_full);

  if (!displayFullDescription) {
    await prisma.descriptionSettings.create({ data: { value: VALUE.display_full } });
    console.log('-> The description settings "display_full" has been created');
  }

  descriptionSettings = await prisma.descriptionSettings.findMany();

  if (descriptionSettings.length !== 3) {
    throw Error('-> Error: Expected 3 description settings');
  }

  console.log('-> Done: Description settings have been created');
};
