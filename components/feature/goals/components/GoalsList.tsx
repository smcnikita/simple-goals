'use client';

import { useMemo, type FC } from 'react';

import type { GoalModel } from '@/models/goals-model';

import GoalsItem from './GoalsItem';
import AddNewGoal from './edit/AddNewGoal';

import classes from '../style/goals.module.css';

type Props = {
  goals: GoalModel[];
  canChangeGoal: boolean;
  isAddNewGoal: boolean;
  updateGoal: (goalId: number, isCompleted: boolean) => Promise<void>;
  removeGoal: (goalId: number) => Promise<void>;
  changeNameGoal: (goalId: number, newName: string) => Promise<void>;
  createGoal: (name: string) => Promise<void>;
  updateIsAddNewGoal: (value: boolean) => void;
};

const GoalsList: FC<Props> = (props) => {
  const { goals, canChangeGoal, isAddNewGoal, updateGoal, removeGoal, changeNameGoal, createGoal, updateIsAddNewGoal } =
    props;

  const uncompletedGoals = useMemo(() => {
    return goals.filter((goal) => !goal.is_completed && goal.completed_at === null);
  }, [goals]);

  const completedGoals = useMemo(() => {
    return goals
      .filter((goal) => goal.is_completed && goal.completed_at !== null)
      .sort((a, b) => new Date(a.completed_at!).getTime() - new Date(b.completed_at!).getTime());
  }, [goals]);

  if (goals.length === 0) {
    return (
      <>
        <p className={classes.noGoals}>No goals yet</p>

        {isAddNewGoal && (
          <div className={classes.item}>
            <AddNewGoal createGoal={createGoal} updateIsAddNewGoal={updateIsAddNewGoal} />
          </div>
        )}
      </>
    );
  }

  return (
    <div className={classes.items}>
      <ul className={classes.list}>
        {uncompletedGoals.map((goal) => (
          <GoalsItem
            key={goal.id}
            goal={goal}
            canChangeGoal={canChangeGoal}
            updateGoal={updateGoal}
            removeGoal={removeGoal}
            changeNameGoal={changeNameGoal}
          />
        ))}
      </ul>

      {isAddNewGoal && (
        <div className={classes.item}>
          <AddNewGoal createGoal={createGoal} updateIsAddNewGoal={updateIsAddNewGoal} />
        </div>
      )}

      {completedGoals.length > 0 && (
        <div className={classes.items_wrapper}>
          <p className={classes.items_title}>Completed</p>
          <ul className={classes.list}>
            {completedGoals.map((goal) => (
              <GoalsItem
                key={goal.id}
                goal={goal}
                canChangeGoal={canChangeGoal}
                updateGoal={updateGoal}
                removeGoal={removeGoal}
                changeNameGoal={changeNameGoal}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GoalsList;
