import * as userService from '@/services/user';

export const deleteUser = async (userId: number) => {
  return await userService.deleteUser(userId);
};
