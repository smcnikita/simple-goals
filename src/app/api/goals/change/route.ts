import { NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';

import { goalsController } from '@/controllers/goals-controller';
import { yearsController } from '@/controllers/years-controller';

import { checkUserIdService } from '@/services/check-user-id-service';
import { logout } from '@/services/auth-service';

export async function POST(req: Request) {
  const checkUserId = await checkUserIdService(req);

  const t = await getTranslations('Errors');

  if (!checkUserId.success) {
    return await logout();
  }

  const userId = checkUserId.userId;

  const res = await req.json();

  const { id, isCompleted, year } = res as { id: number; isCompleted: boolean; year: number };

  if (!id || isCompleted === undefined || !year) {
    return NextResponse.json({ message: t('required', { field: 'id' }) }, { status: 500 });
  }

  const yearModel = await yearsController.getYearByName(userId, year);

  if (!yearModel) {
    return NextResponse.json({ message: t('yearNotFound') }, { status: 500 });
  }

  const updatedGoal = await goalsController.updateGoal(id, isCompleted, yearModel.id, userId);

  const response = NextResponse.json(
    {
      message: t('success'),
      data: updatedGoal,
    },
    { status: 200 }
  );

  return response;
}
