import { NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';

import { goalsController } from '@/controllers/goals-controller';
import { yearsController } from '@/controllers/years-controller';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const t = await getTranslations('Errors');

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = parseInt(session.user.id);

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
