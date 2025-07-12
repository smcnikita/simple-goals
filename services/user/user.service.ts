import { createUser } from './create-user';
import { updateUserName } from './update-user-name';
import {
  getDescriptionSettings,
  getDescriptionSettingsById,
  getDescriptionSettingsValueByKey,
  getUserDescriptionSettings,
} from './get-description-settings';
import { deleteUser } from './delete';
import { getIsUserGoalsEncrypted } from './get-user';

export const userService = {
  getIsUserGoalsEncrypted,
  createUser,
  updateUserName,
  getDescriptionSettings,
  getDescriptionSettingsById,
  getDescriptionSettingsValueByKey,
  getUserDescriptionSettings,
  deleteUser,
};
