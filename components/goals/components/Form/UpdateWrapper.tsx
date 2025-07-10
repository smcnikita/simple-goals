import { useMemo, type FC } from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useGoalsStore } from '@/stores/goals-store';

import useGlobalYear from '@/hooks/use-global-year';

import { Button } from '@/components/ui/button';

import Form from '.';

import type { Description, FormSchema } from '@/types/form-goal.types';
import type { StatusKeys } from '@/types/status.types';

type Props = {
  id: number;
  name: string;
  description: Description | null;
  status: StatusKeys;
  section_id: number | null;
  updateIsEdit: (isEdit: boolean) => void;
};

const UpdateWrapper: FC<Props> = (props) => {
  const { id, name, description, status, section_id, updateIsEdit } = props;

  const t = useTranslations('goals_list');

  const { isLoadingUpdate, updateGoal } = useGoalsStore();

  const oldGoalData = useMemo(() => {
    return {
      id,
      name,
      description,
      status,
      section_id,
    };
  }, [id, name, description, status, section_id]);

  const { globalYear } = useGlobalYear();

  const onSubmitUpdateGoal = async (values: FormSchema) => {
    if (!globalYear) {
      return;
    }

    await updateGoal({
      ...values,
      id,
      section_id: values.section_id || null,
      year: globalYear,
    });

    updateIsEdit(false);
  };

  const afterContent = (
    <div className="flex items-center justify-between gap-1">
      <Button type="button" variant="outline" onClick={() => updateIsEdit(false)}>
        {t('cancel')}
      </Button>
      <Button type="submit" disabled={isLoadingUpdate}>
        {isLoadingUpdate ? <Loader2 className="animate-spin" /> : t('update_goal')}
      </Button>
    </div>
  );

  return (
    <Form afterContent={afterContent} isUpdateGoals={true} oldGoalData={oldGoalData} onSubmit={onSubmitUpdateGoal} />
  );
};

export default UpdateWrapper;
