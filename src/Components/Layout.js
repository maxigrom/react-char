// @flow
import * as React from 'react';
import LeftDrawer from './LeftDrawer';
import MenuAppBar from './MenuAppBar';
import { withStyles } from '@material-ui/core/styles';
import type { TChat } from '../Data/ChatList.data';
import ChatList from './ChatList';
import StyleConstants from '../Consts/StyleConstants';
import * as classnames from 'classnames';

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
  contentWithDrawer: {
    left: StyleConstants.DrawerWidth
  },
});

type Props = {
  chats: TChat[],
  children: React.Node,
  showDrawer?: boolean,
}

class Layout extends React.Component {
  render = () => {
    const { chats, children, classes, showDrawer } = this.props;
    const contentClassName = classnames({
      [classes.content]: true,
      [classes.contentWithDrawer]: showDrawer,
    });

    return (
      <div className={classes.root}>
        <MenuAppBar showDrawer={showDrawer} />
        {showDrawer && (
          <LeftDrawer>
            <ChatList chats={chats} />
          </LeftDrawer>
        )}
        <main className={contentClassName}>
          {children}
        </main>
      </div>
    );
  };
}

export default withStyles(styles)(Layout);
