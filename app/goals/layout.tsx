import { fetchFromAPI } from '@/lib/http';
import type { YearItem } from '@/types/years';

import Aside from '@/components/ui/aside';

import classes from './page.module.css';

type Props = Readonly<{
  children: React.ReactNode;
}>;

const LayoutGoals = async ({ children }: Props) => {
  const years = await fetchFromAPI<YearItem[]>('/years?userId=1');

  return (
    <div className={classes.wrapper}>
      <Aside years={years} />
      <main className={classes.main}>{children}</main>
    </div>
  );
};

export default LayoutGoals;
