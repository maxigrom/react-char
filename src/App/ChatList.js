// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { mainListItem } from './ChatList/ChatListItems';
import { DRAWER_WIDTH } from '../Consts/Styles';
import Input from '@material-ui/core/Input';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: DRAWER_WIDTH,
  },
  toolbar: theme.mixins.toolbar,
  searchChats: {
    padding: '15px 24px 0 24px',
  },
});

type Props = {}

class PermanentDrawer extends React.Component<Props> {
  props: Props;

  render = () => {
    const { classes } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor='left'
      >
        <div className={classes.toolbar}>
          <div className={classes.searchChats}>
            <Input
              fullWidth
              placeholder='Search chats...'
            />
          </div>
        </div>
        <Divider />
        <List>{mainListItem}</List>
      </Drawer>
    );
  };
}

export default withStyles(styles)(PermanentDrawer);
