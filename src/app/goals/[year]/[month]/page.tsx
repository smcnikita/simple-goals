import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { PATHS } from '@/constants/paths';

import Goals from '@/components/feature/goals';

import type { MonthKey } from '@/types/month';

type Params = Promise<{
  year: string;
  month: string;
}>;

type PageParams = {
  params: Params;
};

const MIN_YEAR = 1900;
const CURRENT_YEAR = new Date().getFullYear();

const MIN_MONTH = 1;
const MAX_MONTH = 12;

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

function validateMonth(month: string): MonthKey {
  if (!/^\d{1,2}$/.test(month)) {
    redirect(PATHS.home);
  }

  const monthNum = Number(month);

  if (monthNum < MIN_MONTH || monthNum > MAX_MONTH) {
    redirect(PATHS.home);
  }

  return monthNum.toString() as MonthKey;
}

export async function generateMetadata({ params }: PageParams) {
  const { year: yearSlug, month: monthSlug } = await params;
  const year = validateYear(yearSlug);
  const month = validateMonth(monthSlug);

  const t = await getTranslations('Months');

  return {
    title: `Simple Goals - ${year} / ${t(month)}`,
  };
}

export default async function Page({ params }: PageParams) {
  const { year: yearSlug, month: monthSlug } = await params;
  const year = validateYear(yearSlug);
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
