import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';

import { authOptions } from '@/lib/auth';

import { yearsController } from '@/controllers/years-controller';
import { goalsController } from '@/controllers/goals-controller';

import type { StatusKey } from '@/types/statuses.types';

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
    status: StatusKey;
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

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = Number(session.user.id);

  const res = await req.json();

  const { id, year } = res as {
    id: number;
    year: number;
  };

  if (!id || !year) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }

  const yearModel = await yearsController.getYearByName({ userId, year });

  if (!yearModel) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }

  const nowYear = new Date().getFullYear();

  if (nowYear !== yearModel.year) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }

  const deleteGoals = await goalsController.deleteGoal({ id, userId });

  if (!deleteGoals) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }

  const response = NextResponse.json(
    {
      message: 'Success',
      data: deleteGoals,
    },
    { status: 200 }
  );

  return response;
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = Number(session.user.id);

  const res = await req.json();

  const { id, name, year, description, status } = res as {
    id: number;
    name: string;
    year: number;
    status: StatusKey;
    description?: string;
  };

  if (!id || !name || !year || !status) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }

  const yearModel = await yearsController.getYearByName({ userId, year });

  if (!yearModel) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }

  const updatedGoal = await goalsController.updateGoal({
    id,
    name,
    description: description ?? null,
    statusKey: status,
    userId,
    yearId: yearModel.id,
  });

  if (!updatedGoal) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }

  const response = NextResponse.json(
    {
      message: 'Success',
      data: {
        ...updatedGoal.data,
        status: updatedGoal.status,
      },
    },
    { status: 200 }
  );

  return response;
}
