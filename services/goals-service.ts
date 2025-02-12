'use server';

import { TOKEN } from '@/constants/cookies';
import { PATHS } from '@/constants/paths';
import { goalsController } from '@/controllers/goals-controller';
import { GoalModel } from '@/models/goals-model';
import { getUserIdFromToken } from '@/utils/getUserIdFromToken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const userGoalsByYearService = async (year: number): Promise<GoalModel[]> => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get(TOKEN);
  const userId = await getUserIdFromToken(token);

  if (!userId) {
    redirect(PATHS.home);
  }

  const goals = await getUserGoalsByYear(year, userId);

  if (goals === null) {
    redirect(PATHS.home);
  }

  return goals;
};

export const getUserGoalsByYear = async (year: number, userId: number): Promise<null | GoalModel[]> => {
  return await goalsController.getUserGoalsByYear(year, userId);
};
