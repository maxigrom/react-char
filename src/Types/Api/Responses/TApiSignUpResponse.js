// @flow
import type { TApiUser } from '../TApiUser';

export type TApiSignUpResponse = {
  user: TApiUser,
  token: string,
};
