import type { FC } from 'react';

import type { YearItem } from '@/types/years';
import { fetchFromAPI } from '@/lib/http';

const LayoutGoals: FC = async () => {
  const years = await fetchFromAPI<YearItem[]>('/years?userId=1');

  return (
    <div>
      <aside>
        {years.map((year) => (
          <div key={year.id}>
            <h3>{year.year}</h3>
          </div>
        ))}
      </aside>
    </div>
  );
};

export default LayoutGoals;
