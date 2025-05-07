export const yearsController = {
  getYears: async () => {
    const nowYear = new Date().getFullYear();
    const years: number[] = [nowYear];

    const uniqueYears = Array.from(new Set([...years]));

    return uniqueYears;
  },
};
