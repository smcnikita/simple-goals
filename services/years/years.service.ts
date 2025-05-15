import { createUserYear } from './create-user-year';
import { findOrCreate } from './find-or-create';
import { findYearsByUserId } from './find-years-by-user-id';

export const yearsService = {
  createUserYear,
  findOrCreate,
  findYearsByUserId,
};
