import { createUser } from './create-user';
import { updateUserName } from './update-user-name';
import { updateDescriptionSettings } from './update-description-settings';
import { updatePassword } from './update-password';
import { deleteUser } from './delete';

export const userController = {
  createUser,
  updateUserName,
  updateDescriptionSettings,
  updatePassword,
  deleteUser,
};
