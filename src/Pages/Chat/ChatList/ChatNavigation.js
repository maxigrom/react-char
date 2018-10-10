// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ChatIcon from '@material-ui/icons/Chat';
import ExploreIcon from '@material-ui/icons/Explore';
import StyleConstants from '../../../Consts/StyleConstants';

const styles = theme => ({
  navigation: {
    width: StyleConstants.DrawerWidth,
  },
});

type Props = {};

class ChatNavigation extends React.Component<Props> {
  props: Props;

  render = () => {
    const { classes } = this.props;

    return (
      <BottomNavigation
        showLabels
        className={classes.navigation}
      >
        <BottomNavigationAction label='My Chats' icon={<ChatIcon />} />
        <BottomNavigationAction label='Find Chat' icon={<ExploreIcon />} />
      </BottomNavigation>
    );
  };
}

export default withStyles(styles)(ChatNavigation);
