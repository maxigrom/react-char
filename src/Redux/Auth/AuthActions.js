// @flow
import type { TStore } from '../RootReducer';
import type { TLoginUser } from '../../Types/TLoginUser';
import type { TSignUpJson } from '../../Types/Api/Jsons/TSignUpJson';
import AuthApi from '../../Api/AuthApi';
import LocalStorageHelper from '../../Helpers/LocalStorageHelper';
import * as NotificationActions from '../Notification/NotificationActions';
import { LOGIN, LOGOUT, SIGNUP, RECEIVE_AUTH } from './AuthActionTypes';
import UsersApi from '../../Api/UsersApi';
import type { TUserJson } from '../../Types/Api/Jsons/TUserJson';

type FGetState = () => TStore;

const getSuccessNotification = message => NotificationActions.push({ message: message, type: 'success' });
const getFailureNotification = message => NotificationActions.push({ message: message, type: 'error' });

const dispatchErrors = (dispatch, actionType, reason) => {
  if (typeof reason === 'object') {
    console.error(reason);
    reason = reason.toString();
  }

  dispatch(getFailureNotification(reason));

  dispatch({
    type: actionType.FAILURE,
    reason: reason,
  });
};

export const signUp = (user: TLoginUser) => (dispatch, getState: FGetState) => {
  const actionType = SIGNUP;

  dispatch({ type: actionType.REQUEST });

  return AuthApi.signup(user).then((json: TSignUpJson) => {
    if (!json.token) throw new Error('Token has not been provided!');

    LocalStorageHelper.setAuthToken(json.token);

    dispatch(getSuccessNotification(json.message));

    dispatch({
      type: actionType.SUCCESS,
      payload: json,
    });
  }).catch(reason => {
    dispatchErrors(dispatch, actionType, reason);
  });
};

export const login = (user: TLoginUser) => (dispatch, getState: FGetState) => {
  const actionType = LOGIN;

  dispatch({ type: actionType.REQUEST });

  return AuthApi.login(user).then((json: TSignUpJson) => {
    if (!json.token) throw new Error('Token has not been provided!');

    LocalStorageHelper.setAuthToken(json.token);

    dispatch(getSuccessNotification(json.message));

    dispatch({
      type: actionType.SUCCESS,
      payload: json,
    });
  }).catch(reason => {
    dispatchErrors(dispatch, actionType, reason);
  });
};

export const logout = () => (dispatch, getState: FGetState) => {
  const actionType = LOGOUT;

  dispatch({ type: actionType.REQUEST });

  return AuthApi.logout().then((json: TSignUpJson) => {
    LocalStorageHelper.removeAuthKey();

    dispatch(getSuccessNotification(json.message));

    dispatch({
      type: actionType.SUCCESS,
      payload: json,
    });
  }).catch(reason => {
    dispatchErrors(dispatch, actionType, reason);
  });
};

export const receiveAuth = () => (dispatch, getState: FGetState) => {
  const actionType = RECEIVE_AUTH;

  const { token } = getState().auth;
  if(token == null) return dispatch({ type: actionType.FAILURE });

  dispatch({ type: actionType.REQUEST });
  return UsersApi.getCurrentUser(token).then((json: TUserJson) => {
    dispatch({
      type: actionType.SUCCESS,
      payload: json,
    });
  }).catch(reason => {
    dispatchErrors(dispatch, actionType, reason);
  });
};
