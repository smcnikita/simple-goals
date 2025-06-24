import { createUser } from './create-user';
import { updateUserName } from './update-user-name';
import {
  getDescriptionSettings,
  getDescriptionSettingsById,
  getDescriptionSettingsValueByKey,
  getUserDescriptionSettings,
} from './get-description-settings';
import { deleteUser } from './delete';

export const userService = {
  createUser,
  updateUserName,
  getDescriptionSettings,
  getDescriptionSettingsById,
  getDescriptionSettingsValueByKey,
  getUserDescriptionSettings,
  deleteUser,
};
