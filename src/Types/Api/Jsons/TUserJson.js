// @flow
import type { TApiUser } from '../TApiUser';
import type { TBaseApiJson } from './TBaseApiJson';

export type TUserJson = {
  user: TApiUser,
} & TBaseApiJson;
