import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';

import { authOptions } from '@/lib/auth';
import { yearsController } from '@/controllers/years-controller';
import { goalsController } from '@/controllers/goals-controller';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = Number(session.user.id);

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('year');

  const year = query ? Number(query) : undefined;

  if (!year) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }

  const yearModel = await yearsController.getYearByName({ userId, year });

  if (!yearModel) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }

  const goals = await goalsController.getUserGoals({
    userId,
    yearId: yearModel.id,
  });

  const response = NextResponse.json(
    {
      message: 'Success',
      data: {
        goals,
      },
    },
    { status: 200 }
  );

  return response;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = Number(session.user.id);

  const res = await req.json();

  const { name, year, description, status } = res as {
    name: string;
    year: number;
    status: string;
    description?: string;
  };

  if (!name || !year || !status) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }

  const yearModel = await yearsController.getYearByName({ userId, year });

  if (!yearModel) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }

  const newGoal = await goalsController.createGoal({
    name,
    description: description ?? null,
    statusKey: status,
    userId,
    yearId: yearModel.id,
  });

  if (!newGoal) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }

  const response = NextResponse.json(
    {
      message: 'Success',
      data: {
        ...newGoal.data,
        status: newGoal.status,
      },
    },
    { status: 200 }
  );

  return response;
}
