// @flow
import type { TApiUserInfo } from './TApiUserInfo';

export type TApiChat = {
  _id: string,
  updatedAt: string,
  createdAt: string,
  creator: {
    _id: string,
    username: string,
    lastName: string,
    firstName: string,
  },
  title: string,
  members: TApiUserInfo[],
  __v: number,
};
