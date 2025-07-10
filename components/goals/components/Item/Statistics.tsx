import type { FC } from 'react';

type Props = {
  count: number;
  text: string;
};

const Statistics: FC<Props> = ({ count, text }) => {
  return (
    <div className="border border-gray-200 rounded p-3 flex flex-col items-center justify-center dark:border-zinc-800 dark:bg-zinc-900">
      <span className="text-2xl font-semibold">{count}</span>
      <span className="text-xs text-gray-500 text-center">{text}</span>
    </div>
  );
};

export default Statistics;
