import { createUserYear } from './create-user-year';
import { findOrCreate } from './find-or-create';
import { findYearsByUserId } from './find-years-by-user-id';
import { findYear } from './find-year';
import { getDescriptionSettings, getDescriptionSettingsById } from './get-description-settings';

export const yearsService = {
  createUserYear,
  findOrCreate,
  findYearsByUserId,
  findYear,
  getDescriptionSettings,
  getDescriptionSettingsById,
};
