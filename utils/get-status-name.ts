const enNames: Record<string, string> = {
  in_progress: 'In Progress',
  completed: 'Completed',
  not_completed: 'Not Completed',
  canceled: 'Canceled',

  total: 'Total',
};

export const getStatusName = (key: string): string => {
  return enNames[key];
};
