//@flow
import createRequestAction from '../createRequestAction';

export const FETCH_ALL_CHATS = createRequestAction('chat/FETCH_ALL_CHATS');
export const FETCH_MY_CHATS = createRequestAction('chat/FETCH_MY_CHATS');
export const FETCH_CHAT = createRequestAction('chat/FETCH_CHAT');
export const CREATE_CHAT = createRequestAction('chat/CREATE_CHAT');
export const JOIN_CHAT = createRequestAction('chat/JOIN_CHAT');
export const LEAVE_CHAT = createRequestAction('chat/LEAVE_CHAT');
export const DELETE_CHAT = createRequestAction('chat/DELETE_CHAT');
export const SEND_MESSAGE = createRequestAction('chat/SEND_MESSAGE');

export const SET_ACTIVE_CHAT = Symbol('chat/SET_ACTIVE_CHAT');
export const UNSET_ACTIVE_CHAT = Symbol('chat/UNSET_ACTIVE_CHAT');
