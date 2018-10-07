// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { DRAWER_WIDTH } from '../Consts/Styles';
import Meow from '../Components/Meow';

const styles = theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbar: theme.mixins.toolbar,
  appBar: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
  },
});

class MenuAppBar extends React.Component<Props> {
  props: Props;

  render = () => {
    const { classes } = this.props;

    return (
      <>
      <div className={classes.toolbar}/>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <Meow />
          </IconButton>
          <Typography variant="title" color="inherit">
            React Chat
          </Typography>
        </Toolbar>
      </AppBar>
      </>
    );
  };
}

export default withStyles(styles)(MenuAppBar);
