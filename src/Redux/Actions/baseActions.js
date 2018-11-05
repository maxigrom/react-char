// @flow
import type { FGetState } from '../../Types/Redux/FGetState';
import type { TRequestActionType } from '../../Types/Redux/TRequestActionType';
import { pushFailure } from '../Notification/NotificationActions';

export const dispatchErrors = (dispatch, actionType, reason) => {
  let strReason = reason;
  if (typeof reason === 'object') {
    console.error(reason);
    strReason = reason.toString();
  }

  dispatch(pushFailure(strReason));

  dispatch({
    type: actionType.FAILURE,
    strReason,
  });
};

export function sendRequest(actionType: TRequestActionType, getRequestPromise: Promise, isFetchingProp: string) {
  return (dispatch, getState: FGetState): Promise => {
    const isFetching = getState().services.isFetching[isFetchingProp];
    if (isFetching) return Promise.resolve();

    dispatch({ type: actionType.REQUEST });

    const { token } = getState().auth;
    return getRequestPromise(token)
      .then((json: TChatsJson) => {
        dispatch({
          type: actionType.SUCCESS,
          payload: json,
        });

        return json;
      })
      .catch((reason) => {
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
}
