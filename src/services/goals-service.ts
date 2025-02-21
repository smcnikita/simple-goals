'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { TOKEN } from '@/constants/cookies';
import { PATHS } from '@/constants/paths';

import { GoalModel } from '@/models/goals-model';

import { getUserIdFromToken } from '@/utils/getUserIdFromToken';

import { goalsController } from '@/controllers/goals-controller';

export const userGoalsByYearService = async (year: number): Promise<GoalModel[]> => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get(TOKEN);

  const userId = await getUserIdFromToken(token);

  if (!userId) {
    redirect(PATHS.home);
  }

  const goals = await getUserGoalsByYear(year, userId);

  if (goals === null) {
    return [];
  }

  return goals;
};

export const getUserGoalsByYear = async (year: number, userId: number): Promise<null | GoalModel[]> => {
  return await goalsController.getUserGoalsByYear(year, userId);
};
