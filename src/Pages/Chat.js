// @flow
import * as React from 'react';
import type { TChatMessage } from '../Data/ChatMessages.data';
import ChatMessage from './Chat/ChatMessage';
import Layout from '../Components/Layout';
import { ChatListData } from '../Data/ChatList.data';
import { ChatMessagesData } from '../Data/ChatMessages.data';
import Grid from '@material-ui/core/es/Grid/Grid';
import NewMessage from './Chat/NewMessage';

type Props = {
  chatMessages: TChatMessage[]
};

const CURRENT_USER_ID = 2;

class Chat extends React.Component<Props, State> {
  props: Props;

  render = () => {
    const { chatMessages } = this.props;
    return (
      <Layout chats={ChatListData} showDrawer>
        <Grid
          container
          spacing={16}
          direction='column'
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
      </Layout>
    );
  };
}

export default Chat;
