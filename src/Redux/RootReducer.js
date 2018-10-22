// @flow
import type { TAuthState } from './Auth/AuthReducer';
import AuthReducer from './Auth/AuthReducer';
import type { TNotificationsState } from './Notification/NotificationReducer';
import NotificationReducer from './Notification/NotificationReducer';
import combineReducers from 'redux/src/combineReducers';

export type TStore = {
  auth: TAuthState,
  notifications: TNotificationsState,
};

export const RootReducer = combineReducers({
  auth: AuthReducer,
  notifications: NotificationReducer,
});
