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

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  searchChats: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 3}px`,
  },
  buttonAdd: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 4
  },
  chatList: {
    height: '100%',
    overflowY: 'auto'
  },
});

const DATA = ChatListData;

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
        <Button variant="fab" color="primary" aria-label="Add" className={classes.buttonAdd}>
          <AddIcon />
        </Button>
      </>
    );
  };
}

export default withStyles(styles)(ChatList);
