import { cookies } from 'next/headers';

import { TOKEN } from '@/constants/cookies';

import { getUserIdFromToken } from '@/utils/getUserIdFromToken';

import { yearsController } from '@/controllers/years-controller';

export async function getYears() {
  const cookiesStore = await cookies();

  const token = cookiesStore.get(TOKEN);

  const userId = await getUserIdFromToken(token);

  if (!userId) {
    return;
  }

  return await yearsController.getUserYearsFormatted(userId);
}
