// @flow
import type { TNotification } from '../../Types/TNotification';
import { POP, PUSH } from './NotificationActionTypes';

export type TNotificationsState = TNotification[];

const initialState: TNotificationsState = [];

const NotificationReducer = (state: TNotificationsState = initialState, action): TNotificationsState => {
  switch (action.type) {
    case PUSH:
      return [...state, action.notification];

    case POP:
      return state.slice(1);

    default:
      return state;
  }
};

export default NotificationReducer;
