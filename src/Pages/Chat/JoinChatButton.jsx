// @flow
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import StyleConstants from '../../Consts/StyleConstants';
import Loading from '../../Components/Loading';

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
  loading?: boolean,
  onClick: () => void,

  classes?: Object,
};

const JoinChatButton = ({ classes, loading, onClick }: Props) => (
  <Paper className={classes.paper} elevation={8}>
    <Loading loading={loading} />
    <Button fullWidth variant="contained" color="primary" onClick={onClick}>
      Join Chat
    </Button>
  </Paper>
);

export default withStyles(styles)(JoinChatButton);
