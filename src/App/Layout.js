// @flow
import * as React from 'react';
import MenuAppBar from './MenuAppBar';
import { withStyles } from '@material-ui/core/styles';
import ChatList from './ChatList';

const styles = theme => ({
  root: {
    minHeight: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

type Props = {
  children: React.Node
}

class Layout extends React.Component {
  render = () => {
    const { classes, children } = this.props;

    return (
      <div className={classes.root}>
        <ChatList />
        <main className={classes.content}>
          <MenuAppBar />
          {children}
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Layout);
