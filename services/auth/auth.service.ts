import 'server-only';

import { createUser } from './create-user';
import { findOrCreateUser } from './find-or-create-user';
import { findOrCreateUserByOAuth } from './find-or-create-user-by-oauth';

export const authService = {
  createUser,
  findOrCreateUser,
  findOrCreateUserByOAuth,
};
