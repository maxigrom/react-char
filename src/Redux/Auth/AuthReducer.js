// @flow
import type { TApiUser } from '../../Types/Api/TApiUser';
import LocalStorageHelper from '../../Helpers/LocalStorageHelper';
import { LOGIN, LOGOUT, RECEIVE_AUTH, SIGN_UP } from './AuthActionTypes';

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
  switch (action.type) {
    case LOGIN.REQUEST:
    case LOGOUT.REQUEST:
    case SIGN_UP.REQUEST:
    case RECEIVE_AUTH.REQUEST:
      return state;

    case LOGIN.SUCCESS:
    case SIGN_UP.SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };

    case RECEIVE_AUTH.SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };

    case LOGOUT.SUCCESS:
    case LOGIN.FAILURE:
    case LOGOUT.FAILURE:
    case SIGN_UP.FAILURE:
    case RECEIVE_AUTH.FAILURE:
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
