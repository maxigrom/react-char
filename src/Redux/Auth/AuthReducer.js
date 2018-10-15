// @flow
import type { TApiUser } from '../../Types/Api/TApiUser';
import AuthActionTypes from './AuthActionTypes';
import LocalStorageHelper from '../../Helpers/LocalStorageHelper';

export type TAuthState = {|
  user: ?TApiUser,
  token: ?string,
  isAuthenticated: boolean,
|};

const token = LocalStorageHelper.getAuthToken();

const initialState: TAuthState = {
  user: null,
  token: token,
  isAuthenticated: !!token,
};

const AuthReducer = (state: TAuthState = initialState, action): TAuthState => {
  switch(action.type) {
    case AuthActionTypes.LOGIN.REQUEST:
    case AuthActionTypes.LOGOUT.REQUEST:
    case AuthActionTypes.SIGNUP.REQUEST:
      return state;

    case AuthActionTypes.LOGIN.SUCCESS:
    case AuthActionTypes.SIGNUP.SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };

    case AuthActionTypes.LOGOUT.SUCCESS:
    case AuthActionTypes.LOGIN.FAILURE:
    case AuthActionTypes.LOGOUT.FAILURE:
    case AuthActionTypes.SIGNUP.FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default AuthReducer;
