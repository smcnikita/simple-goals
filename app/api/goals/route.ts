import { NextRequest } from 'next/server';

import { goalsController } from '@/controllers/goals/goals.controller';

import { createErrorResponse } from '@/lib/createErrorResponse';
import { createSuccessResponse } from '@/lib/createSuccessResponse';
import { getUserAndYearModel } from '@/lib/getUserAndYearModel';

import { yearsService } from '@/services/years/years.service';

import type { StatusKeys } from '@/types/status.types';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const year = Number(searchParams.get('year'));

  const result = await getUserAndYearModel(year);

  if (result instanceof Response) {
    return result;
  }

  const [userId, yearModel] = result;

  const goals = await goalsController.getUserGoals({
    userId,
    yearId: yearModel.id,
  });

  const descriptionSettings = await yearsService.getDescriptionSettings();

  const descriptionSettingsSelected = descriptionSettings.find((el) => el.id === yearModel.description_settings_id);

  return createSuccessResponse({
    goals,
    can_edit_past_goals: yearModel.can_edit_past,
    show_statistic: yearModel.show_statistic,
    description_settings: descriptionSettingsSelected,
  });
}

type GoalCreatePayload = {
  name: string;
  year: number;
  status: StatusKeys;
  description?: string;
};

export async function POST(req: NextRequest) {
  const { name, year, description, status } = (await req.json()) as GoalCreatePayload;

  if (!name || !year || !status) {
    return createErrorResponse('Missing required fields', 422);
  }

  const result = await getUserAndYearModel(year);

  if (result instanceof Response) {
    return result;
  }

  const [userId, yearModel] = result;

  const newGoal = await goalsController.createGoal({
    name,
    description: description ?? null,
    statusKey: status,
    userId,
    yearId: yearModel.id,
    year: yearModel.year,
    canEditPastGoals: yearModel.can_edit_past,
  });

  if (!newGoal) {
    return createErrorResponse('Goal not found', 400);
  }

  if (newGoal.error) {
    return createErrorResponse(newGoal.error, 500);
  }

  return createSuccessResponse({
    ...newGoal.data,
    status: newGoal.status,
  });
}

type GoalDeletePayload = {
  id: number;
  year: number;
};

export async function DELETE(req: NextRequest) {
  const { id, year } = (await req.json()) as GoalDeletePayload;

  if (!id || !year) {
    return createErrorResponse('Missing required fields', 422);
  }

  const result = await getUserAndYearModel(year);

  if (result instanceof Response) {
    return result;
  }

  const [userId, yearModel] = result;

  const nowYear = new Date().getFullYear();

  if (!yearModel.can_edit_past && nowYear !== yearModel.year) {
    return createErrorResponse('You cannot delete this goal', 403);
  }

  const deleteGoals = await goalsController.deleteGoal({ id, userId });

  if (!deleteGoals) {
    return createErrorResponse('Goal not found', 400);
  }

  return createSuccessResponse(deleteGoals);
}

type GoalUpdatePayload = {
  id: number;
  name: string;
  year: number;
  status: StatusKeys;
  description?: string;
};

export async function PUT(req: NextRequest) {
  const { id, name, year, description, status } = (await req.json()) as GoalUpdatePayload;

  if (!id || !name || !year || !status) {
    return createErrorResponse('Missing required fields', 422);
  }

  const result = await getUserAndYearModel(year);

  if (result instanceof Response) {
    return result;
  }

  const [userId, yearModel] = result;

  const updatedGoal = await goalsController.updateGoal({
    id,
    name,
    description: description ?? null,
    statusKey: status,
    userId,
    yearId: yearModel.id,
  });

  if (!updatedGoal) {
    return createErrorResponse('Goal not found', 400);
  }

  return createSuccessResponse({
    ...updatedGoal.data,
    status: updatedGoal.status,
  });
}
