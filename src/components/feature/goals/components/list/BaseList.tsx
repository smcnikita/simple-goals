'use client';

import type { FC } from 'react';

import type { GoalModel } from '@/models/goals-model';

import GoalsItem from '../GoalsItem';

import type { GoalModalSaveParams, RemoveGoalProps, UpdateCompletedProps, UpdateNameGoalProps } from '../../types';

import cl from '../../style/goals.module.css';

type Props = {
  goals: GoalModel[];
  title?: string;
  isLoading: boolean;
  canChangeGoal: boolean;

  remove: RemoveGoalProps;
  updateCompleted: UpdateCompletedProps;
  updateName: UpdateNameGoalProps;

  handleOpenModal: (goal: GoalModalSaveParams) => void;
};

const BaseList: FC<Props> = (props) => {
  const { title, goals, isLoading, canChangeGoal, handleOpenModal, remove, updateCompleted, updateName } = props;

  return (
    <div className={cl.items_wrapper}>
      {/* Title */}
      {title && <p className={cl.items_title}>{title}</p>}

      {/* List */}
      <ul className={cl.list}>
        {goals.map((goal) => (
          <GoalsItem
            key={goal.id}
            isLoading={isLoading}
            goal={goal}
            canChangeGoal={canChangeGoal}
            remove={remove}
            updateCompleted={updateCompleted}
            updateName={updateName}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </ul>
    </div>
  );
};

export default BaseList;
