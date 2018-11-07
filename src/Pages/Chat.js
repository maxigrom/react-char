// @flow
import * as React from 'react';
import ChatMessage from './Chat/ChatMessage';
import Grid from '@material-ui/core/Grid';
import Layout from '../Components/Layout';
import ChatList from './Chat/ChatList';
import type { TApiUser } from '../Types/Api/TApiUser';
import type { TApiChat } from '../Types/Api/TApiChat';
import type { RouterState } from 'conn';
import Menu from './Chat/Menu';
import type { TApiChatMessage } from '../Types/Api/TApiChatMessage';
import NewMessage from './Chat/NewMessage';
import JoinChatButton from './Chat/JoinChatButton';
import { withStyles } from '@material-ui/core';
import type { TServiceFetchingState } from '../Redux/Services/ServiceReducer';
import Loading from '../Components/Loading';

type Props = {
  user: ?TApiUser,
  activeChat: ?TApiChat,
  myChats: TApiChat[],
  allChats: TApiChat[],
  messages: TApiChatMessage[],

  isFetching: TServiceFetchingState,
  isFetchingChat: boolean,
  isFetchingChatActions: boolean,
  isConnected: boolean,

  router: RouterState,

  isMember: (chat: ?TApiChat) => boolean,
  isCreator: (chat: ?TApiChat) => boolean,
  isChatMember: (chat: ?TApiChat) => boolean,

  fetchAllChats: () => void,
  fetchMyChats: () => void,
  createChat: (title: string) => void,
  setActiveChat: (chatId: string) => void,
  joinChat: (chatId: string) => void,
  leaveChat: (chatId: string) => void,
  deleteChat: (chatId: string) => void,

  socketsConnect: () => void,
  mountChat: (chatId) => void,
  unmountChat: (chatId) => void,
  sendMessage: (chatId: string, messageText: string) => void,

  logout: () => void,
};

type State = {
  socketIntervalId: ?number
};

const styles = theme => ({
  chatContainer: {
    paddingBottom: theme.mixins.toolbar.minHeight + theme.spacing.md,
  },
});

const getChatId = (path: string): ?string => {
  const params = path.toLowerCase().split('/')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  if (params.length < 2 || params[1].length === 0) return null;
  return params[1];
};

const WRAPPER_ID = 'messagesWrapper';

class Chat extends React.Component<Props> {
  props: Props;

  state = {
    socketIntervalId: 0,
  };

  componentDidMount() {
    const {
      fetchAllChats,
      fetchMyChats,
      setActiveChat,
      socketsConnect,
      mountChat,
    } = this.props;

    Promise.all([fetchAllChats(), fetchMyChats()]).then(() => {
      socketsConnect();
    }).then(() => {
      const id = getChatId(this.props.router.location.pathname);

      if (id) {
        setActiveChat(id);
        mountChat(id);
      }
    });

    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.stopSocketConnecting();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillReceiveProps(nextProps: Props) {
    const { setActiveChat, unmountChat, mountChat } = this.props;

    const currentId = getChatId(this.props.router.location.pathname);
    const nextId = getChatId(nextProps.router.location.pathname);

    if (this.props.isConnected && !nextProps.isConnected) {
      this.runSocketConnecting();
    }

    if (!this.props.isConnected && nextProps.isConnected) {
      this.stopSocketConnecting();
    }

    if (nextId && currentId !== nextId) {
      setActiveChat(nextId);
      unmountChat(currentId);
      mountChat(nextId);
    }
  }

  runSocketConnecting = () => {
    this.setState((prevState: State) => {
      if (prevState.socketIntervalId !== null) clearInterval(prevState.socketIntervalId);

      return {
        socketIntervalId: setInterval(this.props.socketsConnect, 10000),
      };
    });
  };

  stopSocketConnecting = () => {
    if (this.state.socketIntervalId === null) return;

    this.setState((prevState: State) => {
      clearInterval(prevState.socketIntervalId);
      return {
        socketIntervalId: null,
      };
    });
  };

  handleOnSendMessage = (messageText: string) => {
    this.props.sendMessage(this.props.activeChat._id, messageText);
  };

  handleOnClickJoinChat = () => {
    this.props.joinChat(this.props.activeChat._id);
  };

  scrollToBottom = () => {
    const messagesWrapper = document.querySelector(`#${WRAPPER_ID}`);
    if (messagesWrapper) {
      messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
    }
  };

  getBottomController = (isFetchingChatActions) => {
    const { isChatMember, activeChat } = this.props;
    const loading = this.props.isFetchingChat || this.props.isFetchingChatActions;

    return isChatMember(activeChat) ? (
      <NewMessage activeChat={activeChat} onSendMessage={this.handleOnSendMessage} loading={loading} />
    ) : (
      <JoinChatButton onClick={this.handleOnClickJoinChat} loading={loading} />
    );
  };

  render() {
    const {
      classes,
      user,
      activeChat,
      myChats,
      allChats,
      messages,

      isFetching,
      isFetchingChat,
      isConnected,

      isCreator,
      isChatMember,

      createChat,
      logout,

      leaveChat,
      deleteChat,
    } = this.props;

    return (
      <>
      <Loading loading={isFetching.logout} />
      <Loading loading={!isConnected} message='We have lost a connection :(' />
      <Layout.Drawer loading={isFetchingChat}>
        <ChatList
          activeChat={activeChat}
          myChats={myChats}
          allChats={allChats}
          disabled={isFetchingChat}
          createChat={createChat}
        />
      </Layout.Drawer>
      <Menu
        user={user}
        activeChat={activeChat}
        isCreator={isCreator(activeChat)}
        isChatMember={isChatMember(activeChat)}
        leaveChat={leaveChat}
        deleteChat={deleteChat}
        isFetchChatAction={isFetching.leaveChat || isFetching.deleteChat}
        isLoggingOut={isFetching.logout}
        logout={logout}
      />
      <Layout.Body id={WRAPPER_ID} showDrawer>
        <Grid
          container
          spacing={16}
          direction='column'
          className={classes.chatContainer}
          alignItems={'flex-start'}
        >
          {messages.map((chatMessage, i) => (
            <Grid item xs={12} key={i} style={chatMessage.statusMessage ? { width: '100%' } : null}>
              <ChatMessage
                chatMessage={chatMessage}
                isCurrentUser={chatMessage.sender._id === user._id}
              />
            </Grid>
          ))}
        </Grid>
        {activeChat != null && this.getBottomController()}
      </Layout.Body>
      </>
    );
  };
}

export default withStyles(styles)(Chat);
