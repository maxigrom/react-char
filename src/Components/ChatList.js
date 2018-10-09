// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Divider from '@material-ui/core/Divider';
import { ChatListData } from '../Data/ChatList.data';
import type { TChat } from '../Data/ChatList.data';
import ChatListItem from './ChatList/ChatListItem';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ButtonAddChat from './ChatList/ButtonAddChat';
import ChatNavigation from './ChatList/ChatNavigation';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  container: {
    width: '100%',
  },
  searchChats: {
    padding: theme.spacing.unit * 2,
  },
  chatList: {
    height: `calc(100% - ${theme.mixins.toolbar.minHeight * 2}px)`,
    overflowY: 'auto',
  },
});

type Props = {
  chats: TChat[]
};

class ChatList extends React.Component<Props> {
  props: Props;

  render = () => {
    const { chats, classes } = this.props;

    return (
      <>
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
        {chats.map(chat => <ChatListItem key={chat.id} chat={chat} />)}
      </List>
      <Divider />
      <ButtonAddChat />
      <ChatNavigation />
      </>
    );
  };
}

export default withStyles(styles)(ChatList);
