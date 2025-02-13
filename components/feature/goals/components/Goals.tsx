'use client';

import { useEffect, useState, type FC } from 'react';
import toast from 'react-hot-toast';

import type { GoalModel } from '@/models/goals-model';

import { httpUpdateGoal, httpRemoveGoal, httpChangeNameGoal } from '@/lib/http/goals';

import GoalsList from './GoalsList';

import classes from '../style/goals.module.css';

type Props = {
  goals: GoalModel[];
  year: number;
};

const Goals: FC<Props> = ({ goals, year }) => {
  const [localGoals, setLocalGoals] = useState<GoalModel[]>([]);

  const currentYear = new Date().getFullYear();
  const canChangeGoal = year === currentYear;

  const updateGoal = async (goalId: number, isCompleted: boolean) => {
    if (!canChangeGoal) {
      return;
    }

    const res = await httpUpdateGoal(goalId, isCompleted, year);
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    const newGoals = localGoals.map((goal) => {
      if (goal.id === goalId) {
        return {
          ...goal,
          is_completed: isCompleted,
          completed_at: isCompleted ? new Date() : null,
        };
      }
      return goal;
    });

    setLocalGoals(newGoals);
  };

  const removeGoal = async (goalId: number) => {
    if (!canChangeGoal) {
      return;
    }

    const res = await httpRemoveGoal(goalId, year);
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    const newGoals = localGoals.filter((goal) => goal.id !== goalId);

    setLocalGoals(newGoals);
  };

  const changeNameGoal = async (goalId: number, newName: string) => {
    if (!canChangeGoal) {
      return;
    }

    const res = await httpChangeNameGoal(goalId, year, newName);
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    const newGoals = localGoals.map((goal) => {
      if (goal.id === goalId) {
        return {
          ...goal,
          name: newName,
        };
      }
      return goal;
    });

    setLocalGoals(newGoals);
  };

  useEffect(() => {
    setLocalGoals(goals);
  }, [goals]);

  if (goals.length === 0) {
    return (
      <section className={classes.section}>
        <p className={classes.noGoals}>No goals yet</p>
      </section>
    );
  }

  return (
    <section className={classes.section}>
      <GoalsList
        goals={localGoals}
        canChangeGoal={canChangeGoal}
        updateGoal={updateGoal}
        removeGoal={removeGoal}
        changeNameGoal={changeNameGoal}
      />
    </section>
  );
};

export default Goals;
