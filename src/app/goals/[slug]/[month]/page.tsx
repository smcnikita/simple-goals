import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { PATHS } from '@/constants/paths';
import Goals from '@/components/feature/goals';

import type { MonthKey } from '@/types/month';

type Params = Promise<{
  slug: string;
  month: string;
}>;

type PageParams = {
  params: Params;
};

const MIN_YEAR = 1900;
const CURRENT_YEAR = new Date().getFullYear();

const MIN_MONTH = 1;
const MAX_MONTH = 12;

function validateYear(slug: string): number {
  if (!/^\d{4}$/.test(slug)) {
    redirect(PATHS.home);
  }

  const year = Number(slug);

  if (year < MIN_YEAR || year > CURRENT_YEAR) {
    redirect(PATHS.home);
  }

  return year;
}

function validateMonth(slug: string): MonthKey {
  if (!/^\d{1,2}$/.test(slug)) {
    redirect(PATHS.home);
  }

  const month = Number(slug);

  if (month < MIN_MONTH || month > MAX_MONTH) {
    redirect(PATHS.home);
  }

  return month.toString() as MonthKey;
}

export async function generateMetadata({ params }: PageParams) {
  const { slug, month: monthSlug } = await params;
  const year = validateYear(slug);
  const month = validateMonth(monthSlug);

  return {
    title: `Simple Goals - ${year} / ${month}`,
  };
}

export default async function Page({ params }: PageParams) {
  const { slug, month: monthSlug } = await params;
  const year = validateYear(slug);
  const month = validateMonth(monthSlug);

  const t = await getTranslations('Goals');
  const t_month = await getTranslations('Months');

  return (
    <div>
      <h1>{t('titleMonth', { year, month: t_month(month) })}</h1>
      <Goals year={year} month={month} />
    </div>
  );
}
