import { FETCH_CHAT } from '../Chat/ChatActionTypes';
import * as sockets from '../Sockets/SocketsActionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case sockets.SEND_MESSAGE:
    case sockets.RECIEVE_MESSAGE:
      return [...state, action.payload.message];

    case FETCH_CHAT.SUCCESS:
      return action.payload.chat.messages;

    default:
      return state;
  }
};
