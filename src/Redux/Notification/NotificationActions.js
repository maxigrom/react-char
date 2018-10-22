// @flow
import type { TNotification } from '../../Types/TNotification';
import { POP, PUSH } from './NotificationActionTypes';

export const push = (notification: TNotification) => ({
  type: PUSH,
  notification,
});

export const pop = () => ({
  type: POP,
});
