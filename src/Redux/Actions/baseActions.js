// @flow
import type { FGetState } from '../../Types/Redux/FGetState';
import type { TRequestActionType } from '../../Types/Redux/TRequestActionType';
import { push_failure } from '../Notification/NotificationActions';

export function sendRequest(actionType: TRequestActionType, getRequestPromise: Promise, isFetchingProp: string) {
  return (dispatch, getState: FGetState): Promise => {
    const isFetching = getState().services.isFetching[isFetchingProp];
    if (isFetching) return Promise.resolve();

    dispatch({ type: actionType.REQUEST });

    const { token } = getState().auth;
    return getRequestPromise(token).then((json: TChatsJson) => {
      dispatch({
        type: actionType.SUCCESS,
        payload: json,
      });

      return json;
    }).catch(reason => {
      dispatchErrors(dispatch, actionType, reason);
    });
  };
}

export function sendRequestWithTokenChecking(actionType: TRequestActionType, getRequestPromise: Promise, isFetchingProp: string) {
  return (dispatch, getState: FGetState): Promise => {
    const { token } = getState().auth;
    if (token == null) return dispatch({ type: actionType.FAILURE });

    return sendRequest(actionType, getRequestPromise, isFetchingProp)(dispatch, getState);
  };
};

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
