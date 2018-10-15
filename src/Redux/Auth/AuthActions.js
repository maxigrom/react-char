// @flow
import type { TAuthState } from './AuthReducer';
import AuthActionTypes from './AuthActionTypes';
import AuthApi from '../../Api/AuthApi';
import type { TLoginUser } from '../../Types/TLoginUser';
import type { TSignUpJson } from '../../Types/Api/Jsons/TSignUpJson';
import NotificationActions from '../Notification/NotificationActions';
import LocalStorageHelper from '../../Helpers/LocalStorageHelper';

type FGetState = () => TAuthState;

const successMessage = (dispatch, message) => dispatch(NotificationActions.push({ message: message, type: 'success' }));
const failureMessage = (dispatch, message) => dispatch(NotificationActions.push({ message: message, type: 'error' }));

const dispatchErrors = function(dispatch, action, reason) {
  if (typeof reason === 'object') {
    console.error(reason);
    reason = reason.toString();
  }

  failureMessage(dispatch, reason);

  dispatch({
    type: action.FAILURE,
    reason: reason,
  });
};
const AuthActions = {
  signUp: function(user: TLoginUser) {
    return (dispatch, getState: FGetState) => {
      const action = AuthActionTypes.SIGNUP;

      dispatch({ type: action.REQUEST });

      return AuthApi.signup(user).then((json: TSignUpJson) => {
        if (!json.token) throw new Error('Token has not been provided!');

        LocalStorageHelper.setAuthToken(json.token);

        successMessage(dispatch, json.message);

        dispatch({
          type: action.SUCCESS,
          payload: json,
        });
      }).catch(reason => {
        dispatchErrors(dispatch, action, reason);
      });
    };
  },

  login: function(user: TLoginUser) {
    return (dispatch, getState: FGetState) => {
      console.warn('login');

      const action = AuthActionTypes.LOGIN;

      dispatch({ type: action.REQUEST });

      return AuthApi.login(user).then((json: TSignUpJson) => {
        if (!json.token) throw new Error('Token has not been provided!');

        LocalStorageHelper.setAuthToken(json.token);

        successMessage(dispatch, json.message);

        dispatch({
          type: action.SUCCESS,
          payload: json,
        });
      }).catch(reason => {
        dispatchErrors(dispatch, action, reason);
      });
    };
  },

  logout: function() {
    return (dispatch, getState: FGetState) => {
      const action = AuthActionTypes.LOGOUT;

      dispatch({ type: action.REQUEST });

      return AuthApi.logout().then((json: TSignUpJson) => {
        LocalStorageHelper.removeAuthKey();

        successMessage(dispatch, json.message);

        dispatch({
          type: action.SUCCESS,
          payload: json,
        });
      }).catch(reason => {
        dispatchErrors(dispatch, action, reason);
      });
    };
  },
};

export default AuthActions;
