// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Meow from '../Meow';
import StyleConstants from '../../Consts/StyleConstants';
import * as classnames from 'classnames';

const styles = theme => ({
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
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

type Props = {
  showDrawer?: boolean
}

const Menu = (props: Props) => {
  const { showDrawer, classes } = props;
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

export default withStyles(styles)(Menu);
