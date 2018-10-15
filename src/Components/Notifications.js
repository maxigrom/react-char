// @flow
import * as React from 'react';
import { withSnackbar } from 'notistack';
import type { FEnqueueSnackbar } from '../Types/Libs/notistack/TEnqueueSnackbarFunction';
import Store from '../Redux/Store';
import type { TNotification } from '../Types/TNotification';
import NotificationActions from '../Redux/Notification/NotificationActions';
import type { TNotificationsState } from '../Redux/Notification/NotificationReducer';

type Props = {
  enqueueSnackbar: FEnqueueSnackbar,
};

type State = {
  notifications: TNotification[]
};

class Notifications extends React.Component<Props, State> {
  props: Props;

  state: State = {
    notifications: [],
  };

  componentDidMount = () => {
    this.unsubscribe = Store.subscribe(this.onUpdateStore);
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  onUpdateStore = () => {
    const storeNotifications: TNotificationsState = Store.getState().notifications;

    if (this.state.notifications === storeNotifications) return;
    this.setState({
      notifications: storeNotifications,
    });

    if (storeNotifications.length === 0) return;

    const notification = storeNotifications[0];
    this.props.enqueueSnackbar(notification.message, { variant: notification.type });
    Store.dispatch(NotificationActions.pop());
  };

  render = () => null;
}

export default withSnackbar(Notifications);
