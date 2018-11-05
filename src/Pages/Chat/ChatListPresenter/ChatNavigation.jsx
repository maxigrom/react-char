// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ChatIcon from '@material-ui/icons/Chat';
import ExploreIcon from '@material-ui/icons/Explore';
import StyleConstants from '../../../Consts/StyleConstants';

const styles = {
  navigation: {
    width: StyleConstants.DrawerWidth,
  },
};

type Props = {
  currentChatListType: string,
  onClick: (chatType: string) => void,

  classes?: Object,
};

class ChatNavigation extends React.Component<Props> {
  props: Props;

  handleOnClickShowMyChats = () => {
    this.props.onClick('MY_CHATS');
  };

  handleOnClickShowAllChats = () => {
    this.props.onClick('ALL_CHATS');
  };

  render() {
    const { classes, currentChatListType } = this.props;

    return (
      <BottomNavigation showLabels value={currentChatListType === 'MY_CHATS' ? 0 : 1} className={classes.navigation}>
        <BottomNavigationAction label="My Chats" icon={<ChatIcon />} onClick={this.handleOnClickShowMyChats} />
        <BottomNavigationAction label="Find Chat" icon={<ExploreIcon />} onClick={this.handleOnClickShowAllChats} />
      </BottomNavigation>
    );
  }
}

export default withStyles(styles)(ChatNavigation);
