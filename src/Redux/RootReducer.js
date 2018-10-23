// @flow
import type { TAuthState } from './Auth/AuthReducer';
import AuthReducer from './Auth/AuthReducer';
import type { TNotificationsState } from './Notification/NotificationReducer';
import NotificationReducer from './Notification/NotificationReducer';
import type { TChatState } from './Chat/ChatReducer';
import ChatReducer from './Chat/ChatReducer';
import combineReducers from 'redux/src/combineReducers';
import MessagesReducer from './Messages/MessagesReducer';
import type { TApiUserInfo } from '../Types/Api/TApiUserInfo';

export type TStore = {
  auth: TAuthState,
  chats: TChatState,
  notifications: TNotificationsState,
  messages: Object[],
};

export const RootReducer = combineReducers({
  auth: AuthReducer,
  chats: ChatReducer,
  notifications: NotificationReducer,
  messages: MessagesReducer,
});

// selectors
export const getUserId = (user: TApiUserInfo) => user == null ? null : user._id;
export const isMember = (state, chat) => chat == null ? false : chat.members.some(u => getUserId(state.auth.user) === getUserId(u));
export const isCreator = (state, chat) => chat == null ? false : getUserId(state.auth.user) === getUserId(chat.creator);
export const isChatMember = (state, chat) => chat == null ? false : isCreator(state, chat) || isMember(state, chat);
