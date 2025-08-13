import { getTranslations } from 'next-intl/server';

import { prisma } from '@/lib/prisma/prisma';
import type { Section, Goals, Years, Statuses } from '@prisma/client';

import type { StatusKeys } from '@/types/status/status';

type GoalsItem = Omit<Goals, 'id' | 'year_id' | 'status_id' | 'section_id' | 'user_id'> & {
  status: Statuses['key'];
  section: Section['name'] | null;
};

export type ExportGoals = {
  goals: Record<
    Years['year'],
    {
      goals: GoalsItem[];
      count: number;
    }
  >;
};

export const exportGoals = async (userId: number) => {
  const t = await getTranslations('goals_list');

  const exportGoals: ExportGoals = {
    goals: {},
  };

  const years = await prisma.years.findMany({
    where: { user_id: userId },
  });

  const goals = await prisma.goals.findMany({
    where: { user_id: userId },
  });

  const status = await prisma.statuses.findMany();

  const sections = await prisma.section.findMany();

  goals.forEach(async (goal) => {
    const year = years.find((y) => y.id === goal.year_id)?.year;
    const statusKey: StatusKeys = status.find((s) => s.id === goal.status_id)?.key as StatusKeys;
    const section = sections.find((s) => s.id === goal.section_id);

    if (!year || !statusKey) {
      return;
    }

    const sectionName = section ? section.name : null;

    const goalData: GoalsItem = {
      name: goal.name,
      description: goal.description,
      status: t(statusKey),
      completed_at: goal.completed_at,
      created_at: goal.created_at,
      updated_at: goal.updated_at,
      section: sectionName,
    };

    if (!exportGoals.goals[year]) {
      exportGoals.goals[year] = {
        goals: [],
        count: 0,
      };
    }

    exportGoals.goals[year].count += 1;
    exportGoals.goals[year].goals.push(goalData);
  });

  return exportGoals;
};
