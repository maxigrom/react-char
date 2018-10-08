// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Meow from './Meow';
import StyleConstants from '../Consts/StyleConstants';
import * as classnames from 'classnames';

const styles = theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
  },
  appBarWithDrawer: {
    width: `calc(100% - ${StyleConstants.DrawerWidth}px)`,
    left: StyleConstants.DrawerWidth,
  },
});

type Props = {
  showDrawer?: boolean
}

class MenuAppBar extends React.Component<Props> {
  props: Props;

  render = () => {
    const { showDrawer, classes } = this.props;
    const appBarClass = classnames({
      [classes.appBar]: true,
      [classes.appBarWithDrawer]: showDrawer,
    });

    return (
      <AppBar position='absolute' className={appBarClass}>
        <Toolbar>
          <IconButton className={classes.menuButton} color='inherit' aria-label='Menu'>
            <Meow />
          </IconButton>
          <Typography variant='title' color='inherit'>
            React Chat
          </Typography>
        </Toolbar>
      </AppBar>
    );
  };
}

export default withStyles(styles)(MenuAppBar);
