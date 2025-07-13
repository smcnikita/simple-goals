import { NextRequest } from 'next/server';

import { getUserAndYearModel } from '@/lib/getUserAndYearModel';
import { createSuccessResponse } from '@/lib/createSuccessResponse';
import { createErrorResponse } from '@/lib/createErrorResponse';

import * as yearsController from '@/controllers/years';

type UpdateShowStatisticPayload = {
  year: number;
};

export async function POST(req: NextRequest) {
  const { year } = (await req.json()) as UpdateShowStatisticPayload;

  const result = await getUserAndYearModel(year);

  if (result instanceof Response) {
    return result;
  }

  const [userId, yearModel] = result;

  const updatedYear = await yearsController.updateShowStatistic({
    id: yearModel.id,
    isCurrentShowStatistic: yearModel.show_statistic,
    userId,
  });

  if (!updatedYear) {
    return createErrorResponse('Year not found', 400);
  }

  return createSuccessResponse({
    year: updatedYear,
  });
}
