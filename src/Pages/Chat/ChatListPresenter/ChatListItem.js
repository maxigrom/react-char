// @flow
import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DateHelper from '../../../Helpers/DateHelper';
import TextAvatar from '../../../Components/TextAvatar';
import type { TApiChat } from '../../../Types/Api/TApiChat';

type Props = {
  chat: TApiChat,
  onClick: (chatId: string) => void,
  isActive: boolean,
};

class ChatListItem extends React.Component<Props> {
  props: Props;

  handleOnClick = () => {
    this.props.onClick(this.props.chat._id);
  };

  render() {
    const { chat, isActive } = this.props;

    return (
      <ListItem button selected={isActive} onClick={this.handleOnClick}>
        <TextAvatar value={chat.title} />
        <ListItemText primary={chat.title} secondary={DateHelper.toStringFromNow(chat.updatedAt)} />
      </ListItem>
    );
  };
}

export default ChatListItem;
