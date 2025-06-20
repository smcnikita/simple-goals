import { NextRequest } from 'next/server';

import { goalsController } from '@/controllers/goals/goals.controller';

import { createSuccessResponse } from '@/lib/createSuccessResponse';
import { getUserAndYearModel } from '@/lib/getUserAndYearModel';

type Payload = {
  year: number;
};

export async function POST(req: NextRequest) {
  const { year } = (await req.json()) as Payload;

  const result = await getUserAndYearModel(year);

  if (result instanceof Response) {
    return result;
  }

  const [userId, yearModel] = result;

  const newGoals = await goalsController.markAllAsIncomplete(userId, yearModel.id);

  return createSuccessResponse(newGoals);
}
