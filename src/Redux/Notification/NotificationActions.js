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

export const push_success = message => push({
  message: message,
  type: 'success',
});

export const push_failure = message => push({
  message: message,
  type: 'error',
});
