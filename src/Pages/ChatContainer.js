// @flow
import { connect } from 'react-redux';
import * as chatActions from '../Redux/Chat/ChatActions';
import * as chatReducer from '../Redux/Chat/ChatReducer';
import type { TStore } from '../Redux/RootReducer';
import { isChatMember, isCreator, isMember } from '../Redux/RootReducer';
import Chat from './Chat';

const mapStateToProps = (state: TStore) => {
  return {
    user: state.auth.user,
    messages: state.messages,

    activeChat: chatReducer.getById(state.chats, state.chats.activeId),
    myChats: chatReducer.getByIds(state.chats, state.chats.myIds),
    allChats: chatReducer.getByIds(state.chats, state.chats.ids),

    isMember: (chat) => isMember(state, chat),
    isCreator: (chat) => isCreator(state, chat),
    isChatMember: (chat) => isChatMember(state, chat),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchAllChats: () => dispatch(chatActions.fetchAllChats()),
  fetchMyChats: () => dispatch(chatActions.fetchMyChats()),
  setActiveChat: (chatId: string) => dispatch(chatActions.setActiveChat(chatId)),
  createChat: (title: string) => dispatch(chatActions.createChat(title)),

  joinChat: (chatId) => dispatch(chatActions.joinChat(chatId)),
  leaveChat: (chatId) => dispatch(chatActions.leaveChat(chatId)),
  deleteChat: (chatId) => dispatch(chatActions.deleteChat(chatId)),
  sendMessage: (chatId, messageText) => dispatch(chatActions.sendMessage(chatId, messageText)),
  logout: () => dispatch(chatActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
