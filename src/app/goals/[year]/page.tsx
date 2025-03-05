import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { PATHS } from '@/constants/paths';

import Goals from '@/components/feature/goals';

type Params = Promise<{
  year: string;
}>;

type PageParams = {
  params: Params;
};

const MIN_YEAR = 1900;
const CURRENT_YEAR = new Date().getFullYear();

function validateYear(year: string): number {
  if (!/^\d{4}$/.test(year)) {
    redirect(PATHS.home);
  }

  const yearNum = Number(year);

  if (yearNum < MIN_YEAR || yearNum > CURRENT_YEAR) {
    redirect(PATHS.home);
  }

  return yearNum;
}

export async function generateMetadata({ params }: PageParams) {
  const { year: yearSlug } = await params;
  const year = validateYear(yearSlug);

  return {
    title: `Simple Goals - ${year}`,
  };
}

export default async function GoalsSlugPage({ params }: PageParams) {
  const { year: yearSlug } = await params;
  const year = validateYear(yearSlug);
  const t = await getTranslations('Goals');

  return (
    <div>
      <h1>{t('title', { year })}</h1>
      <Goals year={year} />
    </div>
  );
}
