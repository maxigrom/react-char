// @flow
import type { TApiUser } from '../../Types/Api/TApiUser';
import LocalStorageHelper from '../../Helpers/LocalStorageHelper';
import { LOGIN, LOGOUT, RECEIVE_AUTH, SIGNUP } from './AuthActionTypes';

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
    case SIGNUP.REQUEST:
    case RECEIVE_AUTH.REQUEST:
      return state;

    case LOGIN.SUCCESS:
    case SIGNUP.SUCCESS:
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
    case SIGNUP.FAILURE:
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
