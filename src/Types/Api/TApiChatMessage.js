// @flow
import type { TApiUserInfo } from './TApiUserInfo';

export type TApiChatMessage = {
  _id: string,
  updatedAt: string,
  createdAt: string,
  content: string,
  statusMessage?: boolean,
  chatId: string,
  sender: TApiUserInfo,
  __v: number,
};
