import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';

import { statusService } from '@/services/status/status.service';

import { yearsController } from '@/controllers/years/years.controller';

import StoreInitializer from './store-initializer';

import GoalView from '@/components/goals/goal-view';

async function validateYear(inputYear: string): Promise<boolean> {
  const isValidFormat = /^\d{4}$/.test(inputYear);

  if (!isValidFormat) {
    return false;
  }

  const currentYear = new Date().getFullYear();
  const MIN_VALID_YEAR = 2020;
  const numericYear = Number(inputYear);

  if (numericYear < MIN_VALID_YEAR || numericYear > currentYear + 1) {
    return false;
  }

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return false;
  }

  const userId = Number(session.user.id);

  try {
    const availableYears = await yearsController.findOrCreate(userId);

    return availableYears.some(({ year }) => year === numericYear);
  } catch (error) {
    console.error('Error fetching available years:', error);
    return false;
  }
}

async function GoalsPage({ params }: { params: Promise<{ year: string }> }) {
  const yearSlug = (await params).year;

  const isValidYear = await validateYear(yearSlug);

  if (!isValidYear) {
    notFound();
  }

  const statuses = await statusService.getStatuses();

  return (
    <StoreInitializer statuses={statuses}>
      <GoalView year={Number(yearSlug)} />
    </StoreInitializer>
  );
}

export default GoalsPage;
