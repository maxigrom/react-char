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
import withStyles from '@material-ui/core/es/styles/withStyles';

type Props = {
  user: ?TApiUser,
  activeChat: ?TApiChat,
  myChats: TApiChat[],
  allChats: TApiChat[],
  messages: TApiChatMessage[],

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

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillReceiveProps(nextProps) {
    const { setActiveChat, unmountChat, mountChat } = this.props;

    const currentId = getChatId(this.props.router.location.pathname);
    const nextId = getChatId(nextProps.router.location.pathname);

    if (nextId && currentId !== nextId) {
      setActiveChat(nextId);
      unmountChat(currentId);
      mountChat(nextId);
    }
  }

  handleOnSendMessage = (messageText: string) => {
    console.log(this.props.activeChat._id);
    this.props.sendMessage(this.props.activeChat._id, messageText);
  };

  handleOnClickJoinChat = () => {
    this.props.joinChat(this.props.activeChat._id);
  };

  scrollToBottom = () => {
    const messagesWrapper = document.querySelector(`#${WRAPPER_ID}`);
    if (messagesWrapper) {
      console.log(messagesWrapper);
      messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
    }
  };

  getBottomController = () => {
    const { isChatMember, activeChat } = this.props;

    return isChatMember(activeChat) ? (
      <NewMessage activeChat={activeChat} onSendMessage={this.handleOnSendMessage} />
    ) : (
      <JoinChatButton onClick={this.handleOnClickJoinChat} />
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

      isCreator,
      isChatMember,

      createChat,
      setActiveChat,
      logout,

      leaveChat,
      deleteChat,
    } = this.props;

    return (
      <>
      <Layout.Drawer>
        <ChatList
          activeChat={activeChat}
          myChats={myChats}
          allChats={allChats}
          setActiveChat={setActiveChat}
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
