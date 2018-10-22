//@flow
import type { TRequestActionType } from '../../Types/Redux/TRequestActionType';

const createAction = (name: string): TRequestActionType => ({
  REQUEST: Symbol(`${name}_REQUEST`),
  SUCCESS: Symbol(`${name}_SUCCESS`),
  FAILURE: Symbol(`${name}_FAILURE`),
});

export const SIGNUP = createAction('auth/SIGNUP');
export const LOGIN = createAction('auth/LOGIN');
export const LOGOUT = createAction('auth/LOGOUT');
export const RECEIVE_AUTH = createAction('auth/RECEIVE_AUTH');
