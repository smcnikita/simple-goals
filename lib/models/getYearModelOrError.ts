import { NextResponse } from 'next/server';

import { createErrorResponse } from '@/lib/responses/createErrorResponse';

import * as yearsController from '@/controllers/years';

import type { YearModel } from '@/types/years.types';

type NextResponseType = NextResponse<{ message: string }>;

export async function getYearModelOrError(userId: number, year: number): Promise<YearModel | NextResponseType> {
  const yearModel = await yearsController.getYearByName(userId, year);

  if (!yearModel) {
    return createErrorResponse(`Year "${year}" not found`, 400);
  }

  return yearModel;
}
