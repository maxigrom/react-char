import { FETCH_CHAT } from '../Chat/ChatActionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHAT.SUCCESS:
      return action.payload.chat.messages;
    default:
      return state;
  }
};
