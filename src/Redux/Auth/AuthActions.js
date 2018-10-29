// @flow
import type { TLoginUser } from '../../Types/TLoginUser';
import type { TSignUpJson } from '../../Types/Api/Jsons/TSignUpJson';
import AuthApi from '../../Api/AuthApi';
import LocalStorageHelper from '../../Helpers/LocalStorageHelper';
import { push_success } from '../Notification/NotificationActions';
import { LOGIN, LOGOUT, RECEIVE_AUTH, SIGN_UP } from './AuthActionTypes';
import UsersApi from '../../Api/UsersApi';
import type { TUserJson } from '../../Types/Api/Jsons/TUserJson';
import type { FGetState } from '../../Types/Redux/FGetState';
import { dispatchErrors } from '../../Helpers/ReduxHelper';

export const signUp = (user: TLoginUser) => (dispatch) => {
  const actionType = SIGN_UP;

  dispatch({ type: actionType.REQUEST });

  return AuthApi.signup(user).then((json: TSignUpJson) => {
    if (!json.token) throw new Error('Token has not been provided!');

    LocalStorageHelper.setAuthToken(json.token);

    dispatch(push_success(json.message));

    dispatch({
      type: actionType.SUCCESS,
      payload: json,
    });
  }).catch(reason => {
    dispatchErrors(dispatch, actionType, reason);
  });
};

export const login = (user: TLoginUser) => (dispatch) => {
  const actionType = LOGIN;

  dispatch({ type: actionType.REQUEST });

  return AuthApi.login(user).then((json: TSignUpJson) => {
    if (!json.token) throw new Error('Token has not been provided!');

    LocalStorageHelper.setAuthToken(json.token);

    dispatch(push_success(json.message));

    dispatch({
      type: actionType.SUCCESS,
      payload: json,
    });
  }).catch(reason => {
    dispatchErrors(dispatch, actionType, reason);
  });
};

export const logout = () => (dispatch) => {
  const actionType = LOGOUT;

  dispatch({ type: actionType.REQUEST });

  return AuthApi.logout().then((json: TSignUpJson) => {
    LocalStorageHelper.removeAuthKey();

    dispatch(push_success(json.message));

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
  if (token == null) return Promise.resolve(dispatch({ type: actionType.FAILURE }));

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
