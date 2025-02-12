import { NextResponse } from 'next/server';

import { TOKEN } from '@/constants/cookies';

import { goalsController } from '@/controllers/goals-controller';

export async function POST(req: Request) {
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

  const res = await req.json();

  const { id, isCompleted } = res as { id: number; isCompleted: boolean };

  if (!id || isCompleted === undefined) {
    return NextResponse.json({ message: 'Error: id is required' }, { status: 500 });
  }

  const updatedGoal = await goalsController.updateGoal(id, isCompleted);

  const response = NextResponse.json(
    {
      message: 'Success',
      data: updatedGoal,
    },
    { status: 200 }
  );

  return response;
}
