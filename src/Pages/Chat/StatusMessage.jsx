// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import type { TApiChatMessage } from '../../Types/Api/TApiChatMessage';

const styles = {
  statusText: {
    width: '100%',
  },
};

type Props = {
  chatMessage: TApiChatMessage,

  classes?: Object,
};

const ChatMessage = ({ chatMessage, classes }: Props) => {
  const userName = chatMessage.sender.username;

  return (
    <Typography color="secondary" align="center" className={classes.statusText}>
      {userName}
:
      {chatMessage.content}
    </Typography>
  );
};

export default withStyles(styles)(ChatMessage);
