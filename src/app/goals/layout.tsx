import Aside from '@/components/ui/aside';

import classes from './page.module.css';

type Props = Readonly<{
  children: React.ReactNode;
}>;

const LayoutGoals = async ({ children }: Props) => {
  return (
    <div className={classes.wrapper}>
      <Aside />
      <main className={classes.main}>{children}</main>
    </div>
  );
};

export default LayoutGoals;
