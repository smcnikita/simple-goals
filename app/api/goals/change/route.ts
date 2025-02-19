import { NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';

import { TOKEN } from '@/constants/cookies';

import { goalsController } from '@/controllers/goals-controller';
import { yearsController } from '@/controllers/years-controller';

import { getUserIdFromToken } from '@/utils/getUserIdFromToken';

export async function POST(req: Request) {
  const cookiesStore = req.headers.get('cookie');
  const hasToken = cookiesStore?.includes(TOKEN);

  const t = await getTranslations('Errors');

  if (!cookiesStore || !hasToken) {
    return NextResponse.json({ message: t('error') }, { status: 500 });
  }

  const token = cookiesStore
    .split(';')
    .find((cookie) => cookie.includes(TOKEN))
    ?.split('=')[1];

  if (!token) {
    return NextResponse.json({ message: t('error') }, { status: 500 });
  }

  const userId = await getUserIdFromToken({ name: TOKEN, value: token });

  if (!userId) {
    return NextResponse.json({ message: t('error') }, { status: 500 });
  }

  const res = await req.json();

  const { id, isCompleted, year } = res as { id: number; isCompleted: boolean; year: number };

  if (!id || isCompleted === undefined || !year) {
    return NextResponse.json({ message: t('required', { field: 'id' }) }, { status: 500 });
  }

  const yearModel = await yearsController.getYearByName(userId, year);

  if (!yearModel) {
    return NextResponse.json({ message: t('yearNotFound') }, { status: 500 });
  }

  const updatedGoal = await goalsController.updateGoal(id, isCompleted, yearModel.id);

  const response = NextResponse.json(
    {
      message: t('success'),
      data: updatedGoal,
    },
    { status: 200 }
  );

  return response;
}
