import { NextRequest, NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';

import { goalsController } from '@/controllers/goals-controller';
import { yearsController } from '@/controllers/years-controller';

import { checkUserIdService } from '@/services/check-user-id-service';
import { logout } from '@/services/auth-service';

export async function DELETE(req: Request) {
  const checkUserId = await checkUserIdService(req);

  const t = await getTranslations('Errors');

  if (!checkUserId.success) {
    return await logout();
  }

  const userId = checkUserId.userId;

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
  const checkUserId = await checkUserIdService(req);

  const t = await getTranslations('Errors');

  if (!checkUserId.success) {
    return await logout();
  }

  const userId = checkUserId.userId;

  const res = await req.json();

  const { name, year } = res as { name: string; year: number };

  if (!name || !year) {
    return NextResponse.json({ message: t('required', { field: 'name' }) }, { status: 500 });
  }

  const yearModel = await yearsController.getYearByName(userId, year);

  if (!yearModel) {
    return NextResponse.json({ message: t('yearNotFound') }, { status: 500 });
  }

  const newGoal = await goalsController.createGoal({ name, year_id: yearModel.id, user_id: userId });

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
  const checkUserId = await checkUserIdService(req);

  const t = await getTranslations('Errors');

  if (!checkUserId.success) {
    return await logout();
  }

  const userId = checkUserId.userId;

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('year');

  const year = query ? Number(query) : undefined;

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

  const goals = await goalsController.getUserGoalsByYearId(yearId, userId);

  const response = NextResponse.json(
    {
      message: t('success'),
      data: goals,
    },
    { status: 200 }
  );

  return response;
}
