import { NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';
import { getServerSession } from 'next-auth';

import { goalsController } from '@/controllers/goals-controller';
import { yearsController } from '@/controllers/years-controller';

import { authOptions } from '@/lib/auth';

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  const t = await getTranslations('Errors');

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = parseInt(session.user.id);

  const res = await req.json();

  const { id, name, year, description } = res as { id: number; name: string; year: number; description: string };

  if (!id || !name || !year) {
    return NextResponse.json({ message: t('required', { field: 'id' }) }, { status: 500 });
  }

  const yearModel = await yearsController.getYearByName(userId, year);

  if (!yearModel) {
    return NextResponse.json({ message: t('yearNotFound') }, { status: 500 });
  }

  const goal = await goalsController.editGoal(id, name, userId, description);

  const response = NextResponse.json(
    {
      message: t('success'),
      data: goal,
    },
    { status: 200 }
  );

  return response;
}
