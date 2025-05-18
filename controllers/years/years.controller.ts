import { findOrCreate } from './find-or-create';
import { findByUserId } from './find-by-user-id';
import { getYearByName } from './find-by-name';
import { updateShowStatistic } from './update-show-statistic';
import { updateCanEditPast } from './update-can-edit-past';
import { createNextYear } from './create-next-year';

export const yearsController = {
  findOrCreate,
  findByUserId,
  getYearByName,
  updateShowStatistic,
  updateCanEditPast,
  createNextYear,
};
