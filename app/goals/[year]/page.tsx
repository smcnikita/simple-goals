import { type FC } from 'react';

import Goals from '@/components/goals/Goals';
import { getStatuses } from '@/services/statuses-service';

type Params = Promise<{
  year: string;
}>;

type Props = {
  params: Params;
};

const GoalsPage: FC<Props> = async ({ params }) => {
  const year = Number((await params).year);
  const statuses = await getStatuses();

  return (
    <div className="flex flex-col gap-6">
      <Goals year={year} statuses={statuses} />
    </div>
  );
};

export default GoalsPage;
