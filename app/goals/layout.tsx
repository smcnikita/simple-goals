import type { YearItem } from '@/types/years';

import Aside from '@/components/ui/aside';

import classes from './page.module.css';
import { getYears } from './years-actions';

type Props = Readonly<{
  children: React.ReactNode;
}>;

const LayoutGoals = async ({ children }: Props) => {
  const res = (await getYears()) as YearItem[] | undefined;
  const years = res ?? [];

  return (
    <div className={classes.wrapper}>
      <Aside years={years} />
      <main className={classes.main}>{children}</main>
    </div>
  );
};

export default LayoutGoals;
