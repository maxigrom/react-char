// @flow
import { push } from 'connected-react-router';
import * as types from './ChatActionTypes';
import ChatsApi from '../../Api/ChatsApi';
import { sendRequestWithTokenChecking } from '../Actions/baseActions';

export const fetchAllChats = () => sendRequestWithTokenChecking(types.FETCH_ALL_CHATS, token => ChatsApi.fetchAllChats(token), 'fetchAllChats');

export const fetchMyChats = () => sendRequestWithTokenChecking(types.FETCH_MY_CHATS, token => ChatsApi.fetchMyChats(token), 'fetchMyChats');

export const fetchChat = (chatId: string) => sendRequestWithTokenChecking(types.FETCH_CHAT, token => ChatsApi.fetchChat(token, chatId), 'fetchChat');

export const createChat = (title: string) => sendRequestWithTokenChecking(types.CREATE_CHAT, token => ChatsApi.createChat(token, title), 'createChat');

export const joinChat = (chatId: string) => sendRequestWithTokenChecking(types.JOIN_CHAT, token => ChatsApi.joinChat(token, chatId), 'joinChat');

export const leaveChat = (chatId: string) => sendRequestWithTokenChecking(types.LEAVE_CHAT, token => ChatsApi.leaveChat(token, chatId), 'leaveChat');

export const deleteChat = (chatId: string) => sendRequestWithTokenChecking(types.DELETE_CHAT, token => ChatsApi.deleteChat(token, chatId), 'deleteChat');

export const setActiveChat = (chatId: string) => dispatch => dispatch(fetchChat(chatId)).then((data) => {
  if (!data) {
    dispatch(push('/chat'));

    return dispatch({
      type: types.UNSET_ACTIVE_CHAT,
    });
  }

  dispatch({
    type: types.SET_ACTIVE_CHAT,
    payload: data,
  });

  return dispatch(push(`/chat/${data.chat._id}`));
});
