// @flow
import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

type Props = {
  classes: Object
};

type State = {};

const styles = {
  bigAvatar: {
    width: 128,
    height: 128,
    marginRight: 15,
  },
  inlineBlock: {
    display: 'inline-block'
  }
};

class App extends React.Component<Props, State> {
  render = () => {
    const { classes } = this.props;

    return (
      <>
        <Avatar
          alt="Meow"
          src="./assets/favicon.jpg"
          className={classes.bigAvatar + ' ' + classes.inlineBlock}
        />
        <Typography variant='display4' className={classes.inlineBlock}>
          Say hello to my little friend!
        </Typography>
      </>
    );
  }
}

export default  withStyles(styles)(App);
