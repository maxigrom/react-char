// @flow
import * as React from 'react';
import ChatMessage from './Chat/ChatMessage';
import Grid from '@material-ui/core/Grid';
import Layout from '../Components/Layout';
import ChatList from './Chat/ChatList';
import type { TApiUser } from '../Types/Api/TApiUser';
import type { TApiChat } from '../Types/Api/TApiChat';
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

  isMember: (chat: ?TApiChat) => bool,
  isCreator: (chat: ?TApiChat) => bool,
  isChatMember: (chat: ?TApiChat) => bool,

  fetchAllChats: () => void,
  fetchMyChats: () => void,
  createChat: (title: string) => void,
  setActiveChat: (chatId: string) => void,
  joinChat: (chatId: string) => void,
  leaveChat: (chatId: string) => void,
  deleteChat: (chatId: string) => void,
  sendMessage: (chatId: string, messageText: string) => void,
  logout: () => void,
};

const styles = theme => ({
  chatContainer: {
    paddingBottom: theme.mixins.toolbar.minHeight + theme.spacing.md,
  },
});

class Chat extends React.Component<Props> {
  props: Props;

  handleOnSendMessage = (messageText: string) => {
    this.props.sendMessage(this.props.activeChat._id, messageText);
  };

  handleOnClickJoinChat = () => {
    this.props.joinChat(this.props.activeChat._id);
  };

  getBottomController = () => {
    const { isChatMember, activeChat } = this.props;

    return isChatMember(activeChat) ? (
      <NewMessage activeChat={activeChat} onSendMessage={this.handleOnSendMessage} />
    ) : (
      <JoinChatButton onClick={this.handleOnClickJoinChat} />
    );
  };

  render = () => {
    const {
      classes,
      user,
      activeChat,
      myChats,
      allChats,
      messages,

      isMember,
      isCreator,
      isChatMember,

      fetchAllChats,
      fetchMyChats,
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
          fetchAllChats={fetchAllChats}
          fetchMyChats={fetchMyChats}
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
      <Layout.Body showDrawer>
        <Grid
          container
          spacing={16}
          direction='column'
          className={classes.chatContainer}
          alignItems={'flex-start'}
        >
          {messages.map((chatMessage, i) => (
            <Grid item xs={12} key={i}>
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
};

export default withStyles(styles)(Chat);
