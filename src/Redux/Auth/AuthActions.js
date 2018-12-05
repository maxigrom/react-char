// @flow
import type { TLoginUser } from '../../Types/TLoginUser';
import type { TSignUpJson } from '../../Types/Api/Jsons/TSignUpJson';
import AuthApi from '../../Api/AuthApi';
import LocalStorageHelper from '../../Helpers/LocalStorageHelper';
import {
  LOGIN, LOGOUT, RECEIVE_AUTH, SIGNUP,
} from './AuthActionTypes';
import UsersApi from '../../Api/UsersApi';
import { sendRequest } from '../Actions/baseActions';

export const signUp = (user: TLoginUser) => {
  const signUpPromiseFunction = () => AuthApi.signup(user).then((json: TSignUpJson) => {
    if (!json.token) throw new Error('Token has not been provided!');

    LocalStorageHelper.setAuthToken(json.token);
    return json;
  });

  return sendRequest(SIGNUP, signUpPromiseFunction, 'signup');
};

export const login = (user: TLoginUser) => {
  const loginPromiseFunction = () => AuthApi.login(user).then((json: TSignUpJson) => {
    if (!json.token) throw new Error('Token has not been provided!');

    LocalStorageHelper.setAuthToken(json.token);
    return json;
  });

  return sendRequest(LOGIN, loginPromiseFunction, 'login');
};

export const logout = () => {
  const logoutPromiseFunction = () => AuthApi.logout().then((json: TSignUpJson) => {
    LocalStorageHelper.removeAuthKey();
    return json;
  });

  return sendRequest(LOGOUT, logoutPromiseFunction, 'logout');
};

export const receiveAuth = () => {
  const receiveAuthPromiseFunction = token => UsersApi.getCurrentUser(token);
  return sendRequest(RECEIVE_AUTH, receiveAuthPromiseFunction, 'receiveAuth');
};
