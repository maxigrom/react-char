// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DateHelper from '../../Helpers/DateHelper';
import Paper from '@material-ui/core/Paper';
import { getBackColor, getTextColor } from '../../Helpers/getColor';
import TextAvatar from '../../Components/TextAvatar';
import type { TApiChatMessage } from '../../Types/Api/TApiChatMessage';
import StatusMessage from './StatusMessage';

const styles = theme => ({
  message: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  avatar: {
    flex: '0 0 auto',
    marginRight: theme.spacing.xs,
  },
  bubble: {
    borderRadius: 8,
    minWidth: 300,
    flex: '0 1 600px',
    padding: theme.spacing.xs,
  },
  time: {
    marginTop: theme.spacing.xs,
  },
});

type Props = {
  chatMessage: TApiChatMessage,
  isCurrentUser: boolean,
};

class ChatMessage extends React.Component<Props> {
  props: Props;

  render = () => {
    const { chatMessage, isCurrentUser, classes } = this.props;
    if (chatMessage.statusMessage) return (<StatusMessage chatMessage={chatMessage} />);

    const userName = chatMessage.sender.username;
    const textColor = getTextColor(userName);
    const backgroundColor = getBackColor(userName);

    return (
      <div className={classes.message}>
        <TextAvatar value={userName} className={classes.avatar} />
        <Paper className={classes.bubble} style={{ backgroundColor: backgroundColor }}>
          <Typography style={{ color: textColor }}>
            <b>{userName}</b>
          </Typography>
          <Typography>
            {chatMessage.content}
          </Typography>
          <Typography className={classes.time} color='textSecondary'>
            {DateHelper.toStringFromNow(chatMessage.createdAt)}
          </Typography>
        </Paper>
      </div>
    );
  };
}

export default withStyles(styles)(ChatMessage);
