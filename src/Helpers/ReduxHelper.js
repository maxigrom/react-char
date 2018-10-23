import { push_failure } from '../Redux/Notification/NotificationActions';

export const dispatchErrors = (dispatch, actionType, reason) => {
  if (typeof reason === 'object') {
    console.error(reason);
    reason = reason.toString();
  }

  dispatch(push_failure(reason));

  dispatch({
    type: actionType.FAILURE,
    reason: reason,
  });
};
