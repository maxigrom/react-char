// @flow
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StyleConstants from '../../Consts/StyleConstants';
import * as classnames from 'classnames';
import Button from '@material-ui/core/Button';
import type { TApiChat } from '../../Types/Api/TApiChat';
import MenuContainer from '../../Components/Layout/MenuContainer';
import TextAvatar from '../../Components/TextAvatar';
import type { TApiUser } from '../../Types/Api/TApiUser';
import withStyles from '@material-ui/core/es/styles/withStyles';

const styles = theme => ({
  appBar: {
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
  },
  grow: {
    flexGrow: 1,
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
  user: ?TApiUser,
  activeChat: ?TApiChat,
  isCreator: boolean,
  isChatMember: boolean,

  leaveChat: () => void,
  deleteChat: () => void,
  logout: () => void,
};

class Menu extends React.Component<Props> {
  props: Props;

  handleOnClickLeaveChat = () => {
    this.props.leaveChat(this.props.activeChat._id);
  };

  handleOnClickDeleteChat = () => {
    this.props.deleteChat(this.props.activeChat._id);
  };

  render() {
    const {
      user,
      activeChat,
      classes,
      isCreator,
      isChatMember,

      logout,
    } = this.props;
    const appBarClass = classnames({
      [classes.appBar]: true,
      [classes.appBarWithDrawer]: true,
    });

    if (activeChat == null || user == null) return <MenuContainer showDrawer />;

    return (
      <AppBar position='absolute' className={appBarClass}>
        <Toolbar>
          <IconButton className={classes.menuButton} color='inherit' aria-label='Menu'>
            <TextAvatar value={activeChat.title} />
          </IconButton>
          <Typography variant='title' color='inherit' className={classes.grow}>
            {activeChat.title}
          </Typography>
          {isChatMember && (isCreator ? (
            <Button color='inherit' onClick={this.handleOnClickDeleteChat}>Delete Chat</Button>
          ) : (
            <Button color='inherit' onClick={this.handleOnClickLeaveChat}>Leave Chat</Button>
          ))}
          <Button color='inherit' onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    );
  };
}

export default withStyles(styles)(Menu);
