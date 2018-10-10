// @flow
import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import type { TChat } from '../../../Data/ChatList.data';
import Meow from '../../../Components/Meow';
import ListItemText from '@material-ui/core/es/ListItemText/ListItemText';
import DateHelper from '../../../utils/DateHelper';
import TextAvatar from '../../../Components/TextAvatar';

type Props = {
  chat: TChat,
};

class ChatListItem extends React.Component<Props> {
  props: Props;

  render = () => {
    const { chat } = this.props;
    return (
      <ListItem button>
        <TextAvatar value={chat.name} />
        <ListItemText primary={chat.name} secondary={DateHelper.toStringFromNow(chat.updatedAt)} />
      </ListItem>
    );
  };
}

export default ChatListItem;
