// @flow
import * as React from 'react';
import { withSnackbar } from 'notistack';
import type { FEnqueueSnackbar } from '../Types/Libs/notistack/TEnqueueSnackbarFunction';
import Store from '../Redux/Store';
import type { TNotification } from '../Types/TNotification';
import type { TNotificationsState } from '../Redux/Notification/NotificationReducer';
import { pop } from '../Redux/Notification/NotificationActions';

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
    Store.dispatch(pop());
  };

  render() {
    return null;
  };
}

export default withSnackbar(Notifications);
