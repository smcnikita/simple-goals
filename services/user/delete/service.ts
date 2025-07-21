import { prisma } from '@/lib/prisma/prisma';

export const deleteUser = async (id: number) => {
  await prisma.$transaction(async (tx) => {
    // Deleting the user's goals
    await tx.goals.deleteMany({
      where: { user_id: id },
    });

    // Get all the user's years
    const userYears = await tx.years.findMany({
      where: { user_id: id },
    });

    // Delete all sections and years
    for (const year of userYears) {
      await tx.section.deleteMany({
        where: { years_id: year.id },
      });

      await tx.years.delete({
        where: { id: year.id },
      });
    }

    // Deleting the user
    await tx.users.delete({
      where: { id },
    });
  });
};
