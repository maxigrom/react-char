// @flow
import type { TRequestActionType } from '../Types/Redux/TRequestActionType';

const createRequestAction = (name: string): TRequestActionType => ({
  REQUEST: Symbol(`${name}_REQUEST`),
  SUCCESS: Symbol(`${name}_SUCCESS`),
  FAILURE: Symbol(`${name}_FAILURE`),
});

export default createRequestAction;
