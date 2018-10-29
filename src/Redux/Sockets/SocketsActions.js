import SocketIOClient from 'socket.io-client';
import * as types from './SocketsActionTypes';

const createSocket = (token, dispatch) => {
  const socket = SocketIOClient('ws://localhost:8000/', {
    query: { token },
  });

  socket.on('error', (errorMessage) => dispatch(errorMessage));
  socket.on('connect_error', () => dispatch(connectError()));
  socket.on('new-message', (message) => dispatch(newMessage(message)));
  socket.on('new-chat', ({ chat }) => dispatch(newChat(chat)));
  socket.on('deleted-chat', ({ chat }) => {
    const { activeId } = getState().chats;
    dispatch(deletedChat(chat));

    if (activeId === chat._id) {
      dispatch(redirect('/chat'));
    }
  });

  return socket;
};

const connect = () => ({
  type: types.SOCKETS_CONNECTION.SUCCESS,
});

const error = (errorMessage) => ({
  type: types.SOCKETS_CONNECTION.FAILURE,
  payload: new Error(`Connection: ${errorMessage}`),
});

const connectError = () => ({
  type: types.SOCKETS_CONNECTION.FAILURE,
  payload: new Error('We have lost a connection :('),
});

const newMessage = function(message) {
  return {
    type: types.RECIEVE_MESSAGE,
    payload: message,
  };
};

const newChat = function(chat) {
  return {
    type: types.RECIEVE_NEW_CHAT,
    payload: { chat },
  };
};

const deletedChat = function(chat) {
  return {
    type: types.RECIEVE_DELETED_CHAT,
    payload: { chat },
  };
};

let socket = null;
export const socketsConnect = () => (dispatch, getState) => {
  const state = getState();
  const { token } = state.auth;

  socket = createSocket(token, dispatch);
  dispatch(connect());

  return Promise.resolve();
};

export const missingSocketConnection = () => {
  return {
    type: types.SOCKETS_CONNECTION_MISSING,
    payload: new Error('Missing connection!'),
  };
};

export const sendMessage = (chatId, message) => (dispatch, getState) => {
  const { activeId } = getState().chats;

  if (!socket) {
    dispatch(missingSocketConnection());
  }

  console.warn(`socket.emit('send-message', ${chatId});`);
  socket.emit(
    'send-message',
    {
      chatId: chatId,
      content: message,
    },
    () => {
      dispatch({
        type: types.SEND_MESSAGE,
        payload: {
          chatId: activeId,
          content: message,
        },
      });
    },
  );
};

export const mountChat = (chatId) => (dispatch) => {
  if (!socket) {
    dispatch(missingSocketConnection());
  }

  console.warn(`socket.emit('mount-chat', ${chatId});`);
  socket.emit('mount-chat', chatId);

  dispatch({
    type: types.MOUNT_CHAT,
    payload: { chatId },
  });
};

export const unmountChat = (chatId) => (dispatch) => {
  if (!socket) {
    dispatch(missingSocketConnection());
  }

  console.warn(`socket.emit('unmount-chat', ${chatId});`);
  socket.emit('unmount-chat', chatId);

  dispatch({
    type: types.UNMOUNT_CHAT,
    payload: { chatId },
  });
};
