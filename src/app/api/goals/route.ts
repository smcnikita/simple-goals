import { NextRequest, NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';

import { goalsController } from '@/controllers/goals-controller';
import { yearsController } from '@/controllers/years-controller';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Month } from '@/types/month';

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  const t = await getTranslations('Errors');

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = parseInt(session.user.id);

  const res = await req.json();

  const { id, year } = res as { id: number; isCompleted: boolean; year: number };

  if (!id || !year) {
    return NextResponse.json({ message: t('required', { field: 'id' }) }, { status: 500 });
  }

  const yearModel = await yearsController.getYearByName(userId, year);

  if (!yearModel) {
    return NextResponse.json({ message: t('yearNotFound') }, { status: 500 });
  }

  await goalsController.removeGoal(id, yearModel.id, userId);

  const response = NextResponse.json(
    {
      message: t('success'),
    },
    { status: 200 }
  );

  return response;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const t = await getTranslations('Errors');

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = parseInt(session.user.id);

  const res = await req.json();

  const { name, year, month } = res as { name: string; year: number; month?: string };

  if (!name || !year) {
    return NextResponse.json({ message: t('required', { field: 'name' }) }, { status: 500 });
  }

  const yearModel = await yearsController.getYearByName(userId, year);

  if (!yearModel) {
    return NextResponse.json({ message: t('yearNotFound') }, { status: 500 });
  }

  const newGoal = await goalsController.createGoal({
    name,
    year_id: yearModel.id,
    user_id: userId,
    month: month ? Number(month) : undefined,
  });

  const response = NextResponse.json(
    {
      message: t('success'),
      data: newGoal,
    },
    { status: 200 }
  );

  return response;
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const t = await getTranslations('Errors');

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = parseInt(session.user.id);

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('year');
  const queryMonth = searchParams.get('month');

  const year = query ? Number(query) : undefined;
  const month = query ? (Number(queryMonth) as Month) : undefined;

  if (!year) {
    return NextResponse.json({ message: t('required', { field: 'year' }) }, { status: 500 });
  }

  const yearModel = await yearsController.getYearByName(userId, year);
  const currentYear = new Date().getFullYear();

  let yearId: number;

  if (yearModel) {
    yearId = yearModel.id;
  } else {
    if (currentYear === year) {
      const newYear = await yearsController.createYear(userId, year);
      yearId = newYear.id;
    } else {
      return NextResponse.json({ message: t('yearNotFound') }, { status: 500 });
    }
  }

  const goals = month
    ? await goalsController.getUserGoalsMonthByYearId(yearId, userId, month)
    : await goalsController.getUserGoalsByYearId(yearId, userId);

  const response = NextResponse.json(
    {
      message: t('success'),
      data: goals,
    },
    { status: 200 }
  );

  return response;
}
