import { userService } from '@/services/user/user.service';

export const deleteUser = async (userId: number) => {
  return await userService.deleteUser(userId);
};
