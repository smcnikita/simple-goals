import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { PATHS } from '@/constants/paths';

import { userGoalsByYearService } from '@/services/goals-service';

import Goals from '@/components/feature/goals';

export default async function GoalsSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const currentYear = new Date().getFullYear();

  if (!/^\d{4}$/.test(slug)) {
    redirect(PATHS.home);
  }

  const year = Number(slug);

  if (year < 1900 || year > currentYear) {
    redirect(PATHS.home);
  }

  const goals = await userGoalsByYearService(year);

  const t = await getTranslations('Goals');

  return (
    <div>
      <h1>{t('title', { year })}</h1>

      <Goals year={year} goals={goals} />
    </div>
  );
}
