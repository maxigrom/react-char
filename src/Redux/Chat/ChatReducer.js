// @flow
import { combineReducers } from 'redux';
import * as types from './ChatActionTypes';
import * as sockets from '../Sockets/SocketsActionTypes';

export type TChatState = {|
  activeId: ?string,
  ids: [],
  myIds: [],
  chatMap: {},
|};

const initialState: TChatState = {
  activeId: null,
  ids: [],
  myIds: [],
  chatMap: {},
};

export const getChatId = chat => chat._id;
export const getById = (state, id) => state.chatMap[id];
export const getByIds = (state, ids) => [].concat(ids).map(id => getById(state, id)).filter(chat => !!chat);

function deleteChatById(state, chatId) {
  const newState = { ...state };
  delete newState[chatId];
  return newState;
}

const activeId = (state = initialState.activeId, action) => {
  switch (action.type) {
    case types.SET_ACTIVE_CHAT:
      return getChatId(action.payload.chat);

    case types.CREATE_CHAT.SUCCESS:
    case types.JOIN_CHAT.SUCCESS:
      return getChatId(action.payload.chat);

    case types.UNSET_ACTIVE_CHAT:
    case types.DELETE_CHAT.SUCCESS:
      return null;

    case sockets.RECIEVE_DELETED_CHAT:
      return state === getChatId(action.payload.chat) ? null : state;

    default:
      return state;
  }
};

const ids = (state = initialState.ids, action) => {
  switch (action.type) {
    case sockets.RECIEVE_NEW_CHAT:
    case types.FETCH_ALL_CHATS.SUCCESS:
      return action.payload.chats.map(getChatId);

    case types.CREATE_CHAT.SUCCESS:
      return [...state, getChatId(action.payload.chat)];

    case sockets.RECIEVE_DELETED_CHAT:
    case types.DELETE_CHAT.SUCCESS:
      return state.filter(chatId => chatId !== getChatId(action.payload.chat));

    default:
      return state;
  }
};

const myIds = (state = initialState.myIds, action) => {
  switch (action.type) {
    case types.FETCH_MY_CHATS.SUCCESS:
      return action.payload.chats.map(getChatId);

    case types.CREATE_CHAT.SUCCESS:
      return [...state, getChatId(action.payload.chat)];

    case types.LEAVE_CHAT.SUCCESS:
    case types.DELETE_CHAT.SUCCESS:
      return state.filter(chatId => chatId !== getChatId(action.payload.chat));

    default:
      return state;
  }
};

const chatMap = (state = initialState.chatMap, action) => {
  switch (action.type) {
    case types.FETCH_ALL_CHATS.SUCCESS:
    case types.FETCH_MY_CHATS.SUCCESS:
      return {
        ...state,
        ...action.payload.chats.reduce(
          (map, chat) => ({
            ...map,
            [getChatId(chat)]: chat,
          }),
          {},
        ),
      };

    case sockets.RECIEVE_NEW_CHAT:
    case types.CREATE_CHAT.SUCCESS:
    case types.JOIN_CHAT.SUCCESS:
    case types.LEAVE_CHAT.SUCCESS:
      return {
        ...state,
        [getChatId(action.payload.chat)]: action.payload.chat,
      };

    case sockets.RECIEVE_DELETED_CHAT:
    case types.DELETE_CHAT.SUCCESS:
      return deleteChatById(state, getChatId(action.payload.chat));

    default:
      return state;
  }
};

export default combineReducers({
  activeId,
  ids,
  myIds,
  chatMap,
});
