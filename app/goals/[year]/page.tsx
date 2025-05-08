import type { FC } from 'react';

import Goals from '@/components/goals/Goals';

import { getStatuses } from '@/services/statuses-service';

import PageProvider from './_page-provider';

type Params = Promise<{
  year: string;
}>;

type Props = {
  params: Params;
};

const GoalsPage: FC<Props> = async ({ params }) => {
  const yearSlugNumber = Number((await params).year);
  const statuses = await getStatuses();

  return (
    <PageProvider statuses={statuses}>
      <div className="flex flex-col gap-6">
        <Goals globalYear={yearSlugNumber} />
      </div>
    </PageProvider>
  );
};

export default GoalsPage;
