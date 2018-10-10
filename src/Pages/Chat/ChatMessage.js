// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import Meow from '../../Components/Meow';
import type { TChatMessage } from '../../Data/ChatMessages.data';
import DateHelper from '../../utils/DateHelper';
import Paper from '@material-ui/core/Paper';
import { getBackColor, getTextColor } from '../../utils/getColor';
import TextAvatar from '../../Components/TextAvatar';

const styles = theme => ({
  currentUserColor: {
    backgroundColor: yellow[100],
  },
  anotherUserColor: {
    backgroundColor: green[100],
  },
  message: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  avatar: {
    flex: '0 0 auto',
    marginRight: theme.spacing.xs,
  },
  bubble: {
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    minWidth: 300,
    flex: '0 1 600px',
    padding: theme.spacing.xs,
  },
  time: {
    marginTop: theme.spacing.xs,
  },
});

type Props = {
  chatMessage: TChatMessage,
  isCurrentUser: boolean,
};

class ChatMessage extends React.Component<Props> {
  props: Props;

  render = () => {
    const { chatMessage, isCurrentUser, classes } = this.props;

    const login = chatMessage.user.login;
    const textColor = getTextColor(login);
    const backgroundColor = getBackColor(login);

    return (
      <div className={classes.message}>
        <TextAvatar value={login} className={classes.avatar}/>
        <Paper className={classes.bubble} style={{ backgroundColor: backgroundColor }}>
          <Typography style={{ color: textColor }}>
            <b>{login}</b>
          </Typography>
          <Typography>
            {chatMessage.text}
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
