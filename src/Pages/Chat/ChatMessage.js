// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import classnames from 'classnames';
import Meow from '../../Components/Meow';
import type { TChatMessage } from '../../Data/ChatMessages.data';
import DateHelper from '../../Helpers/DateHelper';

const styles = theme => ({
  currentUserColor: {
    backgroundColor: yellow[100],
    marginLeft: theme.spacing.unit * 8,
  },
  anotherUserColor: {
    backgroundColor: green[100],
  },
  chatCard: {
    borderRadius: '8px',
    minWidth: 300,
    maxWidth: 600,
    padding: theme.spacing.unit * 1,
  },
  chatCardContent: {
    padding: '0 !important',
  },
  chatCardContentWrapper: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  avatar: {
    marginRight: theme.spacing.unit * 1,
  },
  chatText: {
    width: '100%',
  },
  time: {
    marginTop: theme.spacing.unit * 1,
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
    const colorClassName = isCurrentUser ? classes.currentUserColor : classes.anotherUserColor;

    return (
      <Card className={classnames(classes.chatCard, colorClassName)}>
        <CardContent className={classes.chatCardContent}>
          <div className={classes.chatCardContentWrapper}>
            <div className={classes.avatar}>
              <Meow />
            </div>
            <div className={classes.chatText}>
              <Typography color='primary'>
                <b>{chatMessage.user.login}</b>
              </Typography>
              <Typography>
                {chatMessage.text}
              </Typography>
            </div>
          </div>
          <div className={classes.time}>
            <Typography color='textSecondary'>
              {DateHelper.toStringFromNow(chatMessage.createdAt)}
            </Typography>
          </div>
        </CardContent>
      </Card>
    );
  };
}

export default withStyles(styles)(ChatMessage);
