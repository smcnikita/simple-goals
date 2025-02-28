import { NextRequest, NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';
import { getServerSession } from 'next-auth';

import { goalsController } from '@/controllers/goals-controller';
import { yearsController } from '@/controllers/years-controller';

import { authOptions } from '@/lib/auth';

import type { Month } from '@/types/month';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const t = await getTranslations('Errors');

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = parseInt(session.user.id);

  const searchParams = req.nextUrl.searchParams;
  const queryYear = searchParams.get('year');
  const queryMonth = searchParams.get('month');

  const year = queryYear ? Number(queryYear) : undefined;
  const month = queryMonth ? (Number(queryMonth) as Month) : undefined;

  if (!year || !month) {
    return NextResponse.json({ message: t('required', { field: year ? 'month' : 'year' }) }, { status: 500 });
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

  const goals = await goalsController.getUserGoalsMonthByYearId(yearId, userId, month);

  const response = NextResponse.json(
    {
      message: t('success'),
      data: goals,
    },
    { status: 200 }
  );

  return response;
}
