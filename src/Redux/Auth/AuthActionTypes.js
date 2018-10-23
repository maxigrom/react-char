//@flow
import createRequestAction from '../createRequestAction';

export const SIGN_UP = createRequestAction('auth/SIGN_UP');
export const LOGIN = createRequestAction('auth/LOGIN');
export const LOGOUT = createRequestAction('auth/LOGOUT');
export const RECEIVE_AUTH = createRequestAction('auth/RECEIVE_AUTH');
