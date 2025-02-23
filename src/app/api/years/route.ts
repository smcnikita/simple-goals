import { yearsController } from '@/controllers/years-controller';
import { checkUserIdService } from '@/services/check-user-id-service';
import { getTranslations } from 'next-intl/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const checkUserId = await checkUserIdService(req);

  const t = await getTranslations('Errors');

  if (!checkUserId.success) {
    return NextResponse.json({ message: checkUserId.error }, { status: 500 });
  }

  const userId = checkUserId.userId;

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
