// @flow
import { connect } from 'react-redux';
import { logout } from '../Redux/Auth/AuthActions';
import * as chatActions from '../Redux/Chat/ChatActions';
import * as socketActions from '../Redux/Sockets/SocketsActions';
import * as chatReducer from '../Redux/Chat/ChatReducer';
import type { TStore } from '../Redux/RootReducer';
import { isChatMember, isCreator, isMember } from '../Redux/RootReducer';
import Chat from './Chat';

const mapStateToProps = (state: TStore) => {
  const isFetching = state.services.isFetching;

  return {
    user: state.auth.user,
    messages: state.messages,
    router: state.router,

    activeChat: chatReducer.getById(state.chats, state.chats.activeId),
    myChats: chatReducer.getByIds(state.chats, state.chats.myIds),
    allChats: chatReducer.getByIds(state.chats, state.chats.ids),

    isFetching: isFetching,
    isFetchingChat: isFetching.fetchAllChats || isFetching.fetchMyChats || isFetching.fetchChat,
    isFetchingChatActions: isFetching.joinChat || isFetching.leaveChat || isFetching.deleteChat,
    isConnected: state.services.isConnected,

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

  socketsConnect: () => dispatch(socketActions.socketsConnect()),
  mountChat: (chatId) => dispatch(socketActions.mountChat(chatId)),
  unmountChat: (chatId) => dispatch(socketActions.unmountChat(chatId)),
  sendMessage: (chatId, messageText) => dispatch(socketActions.sendMessage(chatId, messageText)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
