import { goalsController } from '@/controllers/goals-controller';
import { yearsController } from '@/controllers/years-controller';
import { checkUserIdService } from '@/services/check-user-id-service';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  const checkUserId = await checkUserIdService(req);

  if (!checkUserId.success) {
    return NextResponse.json({ message: checkUserId.error }, { status: 500 });
  }

  const userId = checkUserId.userId;

  const res = await req.json();

  const { id, name, year } = res as { id: number; name: string; year: number };

  if (!id || !name || !year) {
    return NextResponse.json({ message: 'Error: id is required' }, { status: 500 });
  }

  const yearModel = await yearsController.getYearByName(userId, year);

  if (!yearModel) {
    return NextResponse.json({ message: 'Error: year not found' }, { status: 500 });
  }
  const goal = await goalsController.editGoal(id, name);

  const response = NextResponse.json(
    {
      message: 'Success',
      data: goal,
    },
    { status: 200 }
  );

  return response;
}
