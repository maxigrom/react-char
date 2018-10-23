// @flow
import * as types from './ChatActionTypes';
import type { FGetState } from '../../Types/Redux/FGetState';
import type { TChatsJson } from '../../Api/ChatsApi';
import ChatsApi from '../../Api/ChatsApi';
import { dispatchErrors } from '../../Helpers/ReduxHelper';
import { push } from 'connected-react-router';

const sendRequest = (actionType, getRequestPromise) => (dispatch, getState: FGetState) => {
  const { token } = getState().auth;
  if (token == null) return dispatch({ type: actionType.FAILURE });

  dispatch({ type: actionType.REQUEST });

  return getRequestPromise(token).then((json: TChatsJson) => {
    dispatch({
      type: actionType.SUCCESS,
      payload: json,
    });

    return json;
  }).catch(reason => {
    dispatchErrors(dispatch, actionType, reason);
  });
};

export const fetchAllChats = () => sendRequest(
  types.FETCH_ALL_CHATS,
  (token) => ChatsApi.fetchAllChats(token),
);

export const fetchMyChats = () => sendRequest(
  types.FETCH_MY_CHATS,
  (token) => ChatsApi.fetchMyChats(token),
);

export const fetchChat = (chatId: string) => sendRequest(
  types.FETCH_CHAT,
  (token) => ChatsApi.fetchChat(token, chatId),
);

export const createChat = (title: string) => sendRequest(
  types.CREATE_CHAT,
  (token) => ChatsApi.createChat(token, title),
);

export const joinChat = (chatId: string) => (dispatch, getState: FGetState) => (
  sendRequest(
    types.JOIN_CHAT,
    (token) => ChatsApi.joinChat(token, chatId),
  )(dispatch, getState).then(() => {
    dispatch(fetchAllChats());
    dispatch(fetchMyChats());
    dispatch(fetchChat(chatId));
  })
);

export const leaveChat = (chatId: string) => (dispatch, getState: FGetState) => (
  sendRequest(
    types.LEAVE_CHAT,
    (token) => ChatsApi.leaveChat(token, chatId),
  )(dispatch, getState).then(() => {
    dispatch(fetchAllChats());
    dispatch(fetchMyChats());
    dispatch(fetchChat(chatId));
  })
);

export const deleteChat = (chatId: string) => (dispatch, getState: FGetState) => (
  sendRequest(
    types.DELETE_CHAT,
    (token) => ChatsApi.deleteChat(token, chatId),
  )(dispatch, getState).then(() => {
    dispatch(fetchAllChats());
    dispatch(fetchMyChats());
  })
);

export const sendMessage = (chatId: string, messageText: string) => (dispatch, getState: FGetState) => (
  sendRequest(
    types.SEND_MESSAGE,
    (token) => ChatsApi.sendMessage(token, chatId, messageText),
  )(dispatch, getState).then(() => {
    dispatch(fetchChat(chatId));
  })
);

export const setActiveChat = (chatId: string) => dispatch => {
  return dispatch(fetchChat(chatId)).then((data) => {
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
};

