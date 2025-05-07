import { type FC } from 'react';

import Goals from '@/components/goals/Goals';

type Params = Promise<{
  year: string;
}>;

type Props = {
  params: Params;
};

const GoalsPage: FC<Props> = async ({ params }) => {
  const year = Number((await params).year);

  return (
    <div className="flex flex-col gap-6">
      <Goals year={year} />
    </div>
  );
};

export default GoalsPage;
