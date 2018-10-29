// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import type { TApiChatMessage } from '../../Types/Api/TApiChatMessage';

const styles = theme => ({
  statusText: {
    width: '100%',
  },
});

type Props = {
  chatMessage: TApiChatMessage,
};

class ChatMessage extends React.Component<Props> {
  props: Props;

  render() {
    const { chatMessage, classes } = this.props;

    const userName = chatMessage.sender.username;

    return (
      <Typography color='secondary' align='center' className={classes.statusText}>
        {userName}: {chatMessage.content}
      </Typography>
    );
  };
}

export default withStyles(styles)(ChatMessage);
