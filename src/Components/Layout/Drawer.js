// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUIDrawer from '@material-ui/core/Drawer';
import StyleConstants from '../../Consts/StyleConstants';
import Loading from '../Loading';

const styles = theme => ({
  drawer: {
    width: StyleConstants.DrawerWidth,
  },
  drawerPaper: {
    position: 'fixed',
    width: StyleConstants.DrawerWidth,
    overflowX: 'hidden',
  },
});

type Props = {
  children: React.Node,
  loading?: boolean,
};

const Drawer = (props: Props) => {
  const { children, classes, loading } = props;

  return (
    <>
    <MUIDrawer
      anchor='left'
      variant='permanent'
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {children}
      <Loading loading={loading} />
    </MUIDrawer>
    </>
  );
};

export default withStyles(styles)(Drawer);
