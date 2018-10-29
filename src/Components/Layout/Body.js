// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import StyleConstants from '../../Consts/StyleConstants';

const styles = theme => ({
  content: {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    overflowY: 'scroll',
    backgroundColor: theme.palette.background.default,
    marginTop: theme.mixins.toolbar.minHeight + theme.spacing.unit,
    padding: theme.spacing.sm,
  },
});

type Props = {
  id?: string,
  children: React.Node,
  showDrawer?: boolean,
}

const Body = (props: Props) => {
  const { classes, showDrawer, children, id } = props;

  return (
    <main id={id} className={classes.content} style={{ left: showDrawer ? StyleConstants.DrawerWidth : 0 }}>
      {children}
    </main>
  );
};

export default withStyles(styles)(Body);
