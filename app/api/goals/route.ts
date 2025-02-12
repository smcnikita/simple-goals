import { NextResponse } from 'next/server';

import { TOKEN } from '@/constants/cookies';

import { goalsController } from '@/controllers/goals-controller';
import { yearsController } from '@/controllers/years-controller';

import { getUserIdFromToken } from '@/utils/getUserIdFromToken';

export async function DELETE(req: Request) {
  const cookiesStore = req.headers.get('cookie');
  const hasToken = cookiesStore?.includes(TOKEN);

  if (!cookiesStore || !hasToken) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }

  const token = cookiesStore
    .split(';')
    .find((cookie) => cookie.includes(TOKEN))
    ?.split('=')[1];

  if (!token) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }

  const userId = await getUserIdFromToken({ name: TOKEN, value: token });

  if (!userId) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }

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
