import { PATHS } from '@/constants/paths';

const pathsWhereNoHeader = [PATHS.auth.signIn, PATHS.auth.signUp];

export const showHeader = (pathname: string) => {
  return !pathsWhereNoHeader.includes(pathname);
};
