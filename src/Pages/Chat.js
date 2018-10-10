// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core';
import ChatMessage from './Chat/ChatMessage';
import { ChatMessagesData } from '../Data/ChatMessages.data';
import Grid from '@material-ui/core/es/Grid/Grid';
import NewMessage from './Chat/NewMessage';
import Layout from '../Components/Layout';
import ChatList from './Chat/ChatList';
import { ChatListData } from '../Data/ChatList.data';

type Props = {};

const CURRENT_USER_ID = 2;

const styles = theme => ({
  chatContainer: {
    marginBottom: theme.mixins.toolbar.minHeight + theme.spacing.sm,
  },
});

const Chat = (props: Props) => {
  const { classes } = props;

  return (
    <>
    <Layout.Drawer>
      <ChatList chats={ChatListData} />
    </Layout.Drawer>
    <Layout.Menu showDrawer />
    <Layout.Body showDrawer>
      <Grid
        container
        spacing={16}
        direction='column'
        className={classes.chatContainer}
        alignItems={'flex-start'}
      >
        {ChatMessagesData.map((chatMessage, i) => (
          <Grid item xs={12} key={i}>
            <ChatMessage
              chatMessage={chatMessage}
              isCurrentUser={chatMessage.user.id === CURRENT_USER_ID}
            />
          </Grid>
        ))}
      </Grid>
      <NewMessage />
    </Layout.Body>
    </>
  );
};

export default withStyles(styles)(Chat);
