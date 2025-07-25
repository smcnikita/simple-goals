import { NextRequest } from 'next/server';

import { getUserAndYearModel } from '@/lib/models/getUserAndYearModel';
import { createSuccessResponse } from '@/lib/responses/createSuccessResponse';
import { createErrorResponse } from '@/lib/responses/createErrorResponse';

import * as yearsController from '@/controllers/years';

type UpdateCanEditPastPayload = {
  year: number;
};

export async function POST(req: NextRequest) {
  const { year } = (await req.json()) as UpdateCanEditPastPayload;

  const result = await getUserAndYearModel(year);

  if (result instanceof Response) {
    return result;
  }

  const [userId, yearModel] = result;

  const updatedYear = await yearsController.updateCanEditPast({
    id: yearModel.id,
    isCurrentCanEditPast: yearModel.can_edit_past,
    userId,
  });

  if (!updatedYear) {
    return createErrorResponse('Year not found', 400);
  }

  return createSuccessResponse({
    year: updatedYear,
  });
}
