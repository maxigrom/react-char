// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { mainListItem } from './ChatList';
import StyleConstants from '../Consts/StyleConstants';

const styles = theme => ({
  drawer: {
    width: StyleConstants.DrawerWidth
  },
  drawerPaper: {
    position: 'fixed',
    width: StyleConstants.DrawerWidth,
  },
});

type Props = {
  children: React.Node
};

class LeftDrawer extends React.Component<Props> {
  props: Props;

  render = () => {
    const { children, classes } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        className={classes.drawer}
        anchor='left'
      >
        {children}
      </Drawer>
    );
  };
}

export default withStyles(styles)(LeftDrawer);
