// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Divider from '@material-ui/core/Divider';
import ChatListItem from './ChatListPresenter/ChatListItem';
import List from '@material-ui/core/List';
import ButtonAddChat from './ChatListPresenter/ButtonAddChat';
import ChatNavigation from './ChatListPresenter/ChatNavigation';
import type { TApiChat } from '../../Types/Api/TApiChat';
import ModalAddNewChat from './ChatListPresenter/ModalAddNewChat';

const ALL_CHATS = 'ALL_CHATS';
const MY_CHATS = 'MY_CHATS';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  container: {
    width: '100%',
  },
  searchChats: {
    padding: theme.spacing.sm,
  },
  chatList: {
    height: `calc(100% - ${theme.mixins.toolbar.minHeight * 2}px)`,
    overflowY: 'auto',
  },
});

type Props = {
  activeChat: ?TApiChat,
  myChats: TApiChat[],
  allChats: TApiChat[],

  setActiveChat: (chatId: string) => void,
  createChat: (title: string) => void,
};

type State = {
  isOpenModal: boolean,
  chatListType: ALL_CHATS | MY_CHATS;
};

class ChatList extends React.Component<Props, State> {
  props: Props;

  state = {
    isOpenModal: false,
    chatListType: MY_CHATS,
  };

  handleOnClickOpenModal = () => {
    this.setState({
      isOpenModal: true,
    });
  };

  handleOnCloseModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  handleOnCreateChat = (title: string) => {
    this.props.createChat(title);
    this.setState({
      isOpenModal: false,
    });
  };

  handleOnClickChatListType = (chatListType: string) => {
    this.setState({
      chatListType: chatListType,
    });
  };

  render() {
    const { isOpenModal, chatListType } = this.state;
    const { allChats, myChats, activeChat, classes } = this.props;
    const displayChatList = chatListType === ALL_CHATS ? allChats : myChats;

    return (
      <>
      <ModalAddNewChat isOpen={isOpenModal} onClose={this.handleOnCloseModal} onCreate={this.handleOnCreateChat} />
      <div className={classes.toolbar}>
        <div className={classes.searchChats}>
          <Input
            fullWidth
            placeholder='Search chats...'
          />
        </div>
      </div>
      <Divider />
      <List className={classes.chatList}>
        {displayChatList.map(chat =>
          <ChatListItem
            key={chat._id}
            chat={chat}
            onClick={this.props.setActiveChat}
            isActive={!!activeChat && chat._id === activeChat._id}
          />,
        )}
      </List>
      <Divider />
      <ButtonAddChat onClick={this.handleOnClickOpenModal} />
      <ChatNavigation currentChatListType={chatListType} onClick={this.handleOnClickChatListType} />
      </>
    );
  };
}

export default withStyles(styles)(ChatList);
