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

export const pushSuccess = message => push({
  message,
  type: 'success',
});

export const pushFailure = message => push({
  message,
  type: 'error',
});
