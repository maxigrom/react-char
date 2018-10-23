// @flow
import type { TApiUserInfo } from './TApiUserInfo';

export type TApiUser = TApiUserInfo & {
  createdAt: string,
  chats: mixed[],
  messagesCount: number,
};

