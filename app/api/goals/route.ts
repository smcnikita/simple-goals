import { NextRequest } from 'next/server';

import * as goalsController from '@/controllers/goals';

import { createErrorResponse } from '@/lib/responses/createErrorResponse';
import { createSuccessResponse } from '@/lib/responses/createSuccessResponse';
import { getUserAndYearModel } from '@/lib/models/getUserAndYearModel';

import type { StatusKeys } from '@/types/status/status';

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

  return createSuccessResponse({
    goals,
    can_edit_past_goals: yearModel.can_edit_past,
    show_statistic: yearModel.show_statistic,
  });
}

type GoalCreatePayload = {
  name: string;
  year: number;
  status: StatusKeys;
  description?: string;
  section_id: number | null;
};

export async function POST(req: NextRequest) {
  const { name, year, description, status, section_id } = (await req.json()) as GoalCreatePayload;

  if (!name || !year || !status || section_id === undefined) {
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
    section_id,
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
  section_id: number | null;
};

export async function PUT(req: NextRequest) {
  const { id, name, year, description, status, section_id } = (await req.json()) as GoalUpdatePayload;

  if (!id || !name || !year || !status || section_id === undefined) {
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
    section_id,
  });

  if (!updatedGoal) {
    return createErrorResponse('Goal not found', 400);
  }

  return createSuccessResponse({
    ...updatedGoal.data,
    status: updatedGoal.status,
  });
}
