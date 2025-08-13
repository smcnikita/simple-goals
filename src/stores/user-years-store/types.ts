export type Store = {
  isLoadingCreateNextYear: boolean;
  userYears: number[];
  updateUserYears: (value: number[]) => void;
  createNextYear: () => Promise<void>;
};
