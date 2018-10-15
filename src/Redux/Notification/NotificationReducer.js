// @flow
import type { TNotification } from '../../Types/TNotification';
import NotificationActionTypes from './NotificationActionTypes';

export type TNotificationsState = TNotification[];

const initialState: TNotificationsState = [];

const NotificationReducer = (state: TNotificationsState = initialState, action): TNotificationsState => {
  switch(action.type) {
    case NotificationActionTypes.NOTIFICATION_PUSH:
      return [...state, action.notification];

    case NotificationActionTypes.NOTIFICATION_POP:
      return state.slice(1);

    default:
      return state;
  }
};

export default NotificationReducer;
