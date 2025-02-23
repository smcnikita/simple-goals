import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { PATHS } from '@/constants/paths';
import Goals from '@/components/feature/goals';

type Params = Promise<{
  slug: string;
}>;

type PageParams = {
  params: Params;
};

const MIN_YEAR = 1900;
const CURRENT_YEAR = new Date().getFullYear();

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

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params;
  const year = validateYear(slug);

  return {
    title: `Simple Goals - ${year}`,
  };
}

export default async function GoalsSlugPage({ params }: PageParams) {
  const { slug } = await params;
  const year = validateYear(slug);
  const t = await getTranslations('Goals');

  return (
    <div>
      <h1>{t('title', { year })}</h1>
      <Goals year={year} />
    </div>
  );
}
