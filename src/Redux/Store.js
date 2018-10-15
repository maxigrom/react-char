import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import NotificationReducer from './Notification/NotificationReducer';
import AuthReducer from './Auth/AuthReducer';
import type { TAuthState } from './Auth/AuthReducer';
import type { TNotificationsState } from './Notification/NotificationReducer';

export type TStoreState = {
  auth: TAuthState,
  notifications: TNotificationsState,
};

const Store = createStore(
  combineReducers({
    auth: AuthReducer,
    notifications: NotificationReducer,
  }),
  applyMiddleware(thunkMiddleware),
);

export default Store;
