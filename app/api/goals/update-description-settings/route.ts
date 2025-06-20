import { NextRequest } from 'next/server';

import { getUserAndYearModel } from '@/lib/getUserAndYearModel';
import { createSuccessResponse } from '@/lib/createSuccessResponse';
import { createErrorResponse } from '@/lib/createErrorResponse';

import { yearsController } from '@/controllers/years/years.controller';

import { yearsService } from '@/services/years/years.service';

type Payload = {
  year: number;
  description_settings_id: number;
};

export async function POST(req: NextRequest) {
  const { year, description_settings_id } = (await req.json()) as Payload;

  if (!description_settings_id) {
    return createErrorResponse('Missing required fields', 422);
  }

  const result = await getUserAndYearModel(year);

  if (result instanceof Response) {
    return result;
  }

  const [userId, yearModel] = result;

  const updatedYear = await yearsController.updateDescriptionSettings({
    id: yearModel.id,
    descriptionSettingsId: description_settings_id,
    userId,
  });

  if (!updatedYear) {
    return createErrorResponse('Year not found', 400);
  }

  return createSuccessResponse({
    description_settings: await yearsService.getDescriptionSettingsById(updatedYear.description_settings_id),
  });
}
