import { yearsController } from '@/controllers/years-controller';
import { getTranslations } from 'next-intl/server';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);

  const t = await getTranslations('Errors');

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = parseInt(session.user.id);

  const years = await yearsController.getUserYearsFormatted(userId);

  const yearsWithoutCurrentYear = years
    .filter((year) => year.year !== new Date().getFullYear())
    .map((year) => year.year);

  const response = NextResponse.json(
    {
      message: t('success'),
      data: yearsWithoutCurrentYear,
    },
    { status: 200 }
  );

  return response;
}
