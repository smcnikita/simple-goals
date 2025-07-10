import { createUser } from './create-user';
import { updateUserName } from './update-user-name';
import { updateDescriptionSettings } from './update-description-settings';
import { updatePassword } from './update-password';
import { deleteUser } from './delete';
import { encryptGoals, decryptGoals } from './crypt-goals';

export const userController = {
  createUser,
  updateUserName,
  updateDescriptionSettings,
  updatePassword,
  deleteUser,
  encryptGoals,
  decryptGoals,
};
