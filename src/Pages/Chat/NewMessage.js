// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import StyleConstants from '../../Consts/StyleConstants';

type Props = {};

const styles = theme => ({
  newMessage: {
    position: 'fixed',
    top: 'auto',
    left: StyleConstants.DrawerWidth + theme.spacing.sm,
    bottom: theme.spacing.sm,
    right:theme.spacing.md,
    padding: theme.spacing.sm,
  },
});

class NewMessage extends React.Component<Props, State> {
  props: Props;

  render = () => {
    const { classes } = this.props;

    return (
      <Paper className={classes.newMessage} elevation={8}>
        <Input fullWidth placeholder='Type your message...' />
      </Paper>
    );
  };
}

export default withStyles(styles)(NewMessage);
