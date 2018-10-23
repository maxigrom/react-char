// @flow
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import StyleConstants from '../../Consts/StyleConstants';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/es/Button/Button';

const styles = theme => ({
  paper: {
    position: 'fixed',
    top: 'auto',
    left: StyleConstants.DrawerWidth + theme.spacing.sm,
    bottom: theme.spacing.sm,
    right: theme.spacing.md,
    padding: theme.spacing.sm,
  },
});

type Props = {
  onClick: () => void,
};

const JoinChatButton = (props: Props) => {
  const { classes, onClick } = props;

  return (
    <Paper className={classes.paper} elevation={8}>
      <Button fullWidth variant='contained' color='primary' onClick={onClick}>Join Chat</Button>
    </Paper>
  );
};

export default withStyles(styles)(JoinChatButton);
