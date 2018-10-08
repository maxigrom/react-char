// @flow
import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import type { TChat } from '../../Data/ChatList.data';
import Meow from '../Meow';
import ListItemText from '@material-ui/core/es/ListItemText/ListItemText';
import DateHelper from '../../Helpers/DateHelper';

type Props = {
  chat: TChat,
};

export default class ChatListItem extends React.Component<Props> {
  props: Props;

  render = () => {
    const { chat } = this.props;
    return (
      <ListItem button>
        <Meow />
        <ListItemText primary={chat.name} secondary={DateHelper.toStringFromNow(chat.updatedAt)} />
      </ListItem>
    );
  };
}
