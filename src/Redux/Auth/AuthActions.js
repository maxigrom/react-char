// @flow
import type { TAuthState } from './AuthReducer';
import type { TLoginUser } from '../../Types/TLoginUser';
import type { TSignUpJson } from '../../Types/Api/Jsons/TSignUpJson';
import AuthApi from '../../Api/AuthApi';
import LocalStorageHelper from '../../Helpers/LocalStorageHelper';
import * as NotificationActions from '../Notification/NotificationActions';
import { LOGIN, LOGOUT, SIGNUP } from './AuthActionTypes';

type FGetState = () => TAuthState;

const getSuccessNotification = message => NotificationActions.push({ message: message, type: 'success' });
const getFailureNotification = message => NotificationActions.push({ message: message, type: 'error' });

const dispatchErrors = (dispatch, action, reason) => {
  if (typeof reason === 'object') {
    console.error(reason);
    reason = reason.toString();
  }

  dispatch(getFailureNotification(reason));

  dispatch({
    type: action.FAILURE,
    reason: reason,
  });
};

export const signUp = (user: TLoginUser) => (dispatch, getState: FGetState) => {
  const action = SIGNUP;

  dispatch({ type: action.REQUEST });

  return AuthApi.signup(user).then((json: TSignUpJson) => {
    if (!json.token) throw new Error('Token has not been provided!');

    LocalStorageHelper.setAuthToken(json.token);

    dispatch(getSuccessNotification(json.message));

    dispatch({
      type: action.SUCCESS,
      payload: json,
    });
  }).catch(reason => {
    dispatchErrors(dispatch, action, reason);
  });
};

export const login = (user: TLoginUser) => (dispatch, getState: FGetState) => {
  console.warn('login');

  const action = LOGIN;

  dispatch({ type: action.REQUEST });

  return AuthApi.login(user).then((json: TSignUpJson) => {
    if (!json.token) throw new Error('Token has not been provided!');

    LocalStorageHelper.setAuthToken(json.token);

    dispatch(getSuccessNotification(json.message));

    dispatch({
      type: action.SUCCESS,
      payload: json,
    });
  }).catch(reason => {
    dispatchErrors(dispatch, action, reason);
  });
};

export const logout = () => (dispatch, getState: FGetState) => {
  const action = LOGOUT;

  dispatch({ type: action.REQUEST });

  return AuthApi.logout().then((json: TSignUpJson) => {
    LocalStorageHelper.removeAuthKey();

    dispatch(getSuccessNotification(json.message));

    dispatch({
      type: action.SUCCESS,
      payload: json,
    });
  }).catch(reason => {
    dispatchErrors(dispatch, action, reason);
  });
};
