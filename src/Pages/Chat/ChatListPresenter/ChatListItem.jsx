// @flow
import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Route } from 'react-router-dom';
import DateHelper from '../../../Helpers/DateHelper';
import TextAvatar from '../../../Components/TextAvatar';
import type { TApiChat } from '../../../Types/Api/TApiChat';

type Props = {
  chat: TApiChat,
  disabled: boolean,
  isActive: boolean,
};

class ChatListItem extends React.Component<Props> {
  props: Props;

  handleOnClick = (history, chat) => () => {
    if (this.props.disabled) return;
    history.push(`/chat/${chat._id}`);
  };

  render() {
    const { chat, disabled, isActive } = this.props;

    return (
      <Route
        render={({ history }) => (
          <ListItem button selected={isActive} onClick={this.handleOnClick(history, chat)} disabled={disabled}>
            <TextAvatar value={chat.title} />
            <ListItemText primary={chat.title} secondary={DateHelper.toStringFromNow(chat.updatedAt)} />
          </ListItem>
        )}
      />
    );
  }
}

export default ChatListItem;
