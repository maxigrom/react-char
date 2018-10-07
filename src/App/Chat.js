// @flow
import * as React from 'react';
import { ChatData } from './Chat/Chat.data';
import ChatMessage from './Chat/ChatMessage';

type Props = {};

const DATA = ChatData;

const CURRENT_USER_ID = 2;

class Chat extends React.Component<Props, State> {
  props: Props;

  render = () => {
    return (
      <div>
        {DATA.map((d, i) => <ChatMessage key={i} {...d} isCurrentUser={d.user.id === CURRENT_USER_ID}/>)}
      </div>
    );
  };
}

export default Chat;
