// @flow
import type { TNotification } from '../../Types/TNotification';
import NotificationActionTypes from './NotificationActionTypes';

const NotificationActions = {
  push: function(notification: TNotification) {
    return {
      type: NotificationActionTypes.NOTIFICATION_PUSH,
      notification
    };
  },

  pop: function() {
    return {
      type: NotificationActionTypes.NOTIFICATION_POP,
    };
  },
};

export default NotificationActions;
