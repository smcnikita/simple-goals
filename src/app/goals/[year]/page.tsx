import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth/auth';

import StoreInitializer from './store-initializer';

import * as yearsController from '@/controllers/years';

import * as statusService from '@/services/status';
import * as userService from '@/services/user';

import { Main } from '@/components/goals';

async function validateYear(inputYear: string) {
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

    if (availableYears) {
      return availableYears.some(({ year }) => year === numericYear);
    }
  } catch (error) {
    console.error('Error fetching available years:', error);
    return false;
  }
}

async function GoalsPage({ params }: { params: Promise<{ year: string }> }) {
  const yearSlug = (await params).year;

  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Session is not defined. Please ensure that the session is initialized before proceeding.');
  }

  const isValidYear = await validateYear(yearSlug);

  if (!isValidYear) {
    notFound();
  }

  const statuses = await statusService.getStatuses();

  const userDescriptionSetting = await userService.getUserDescriptionSettings(Number(session.user.id));

  if (!userDescriptionSetting) {
    throw new Error('User description settings could not be found');
  }

  const isEncryptedGoals = await userService.getIsUserGoalsEncrypted();

  return (
    <StoreInitializer statuses={statuses}>
      <Main year={Number(yearSlug)} descriptionSettings={userDescriptionSetting} isEncryptedGoals={isEncryptedGoals} />
    </StoreInitializer>
  );
}

export default GoalsPage;
