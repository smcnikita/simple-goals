import { NextResponse } from 'next/server';

import { goalsController } from '@/controllers/goals-controller';
import { yearsController } from '@/controllers/years-controller';

import { checkUserIdService } from '@/services/check-user-id-service';

export async function DELETE(req: Request) {
  const checkUserId = await checkUserIdService(req);

  if (!checkUserId.success) {
    return NextResponse.json({ message: checkUserId.error }, { status: 500 });
  }

  const userId = checkUserId.userId;

  const res = await req.json();

  const { id, year } = res as { id: number; isCompleted: boolean; year: number };

  if (!id || !year) {
    return NextResponse.json({ message: 'Error: id is required' }, { status: 500 });
  }

  const yearModel = await yearsController.getYearByName(userId, year);

  if (!yearModel) {
    return NextResponse.json({ message: 'Error: year not found' }, { status: 500 });
  }

  await goalsController.removeGoal(id, yearModel.id);

  const response = NextResponse.json(
    {
      message: 'Success',
    },
    { status: 200 }
  );

  return response;
}

export async function POST(req: Request) {
  const checkUserId = await checkUserIdService(req);

  if (!checkUserId.success) {
    return NextResponse.json({ message: checkUserId.error }, { status: 500 });
  }

  const userId = checkUserId.userId;

  const res = await req.json();

  const { name, year } = res as { name: string; year: number };

  if (!name || !year) {
    return NextResponse.json({ message: 'Error: name is required' }, { status: 500 });
  }

  const yearModel = await yearsController.getYearByName(userId, year);

  if (!yearModel) {
    return NextResponse.json({ message: 'Error: year not found' }, { status: 500 });
  }

  const newGoal = await goalsController.createGoal({ name, year_id: yearModel.id });

  const response = NextResponse.json(
    {
      message: 'Success',
      data: newGoal,
    },
    { status: 200 }
  );

  return response;
}
