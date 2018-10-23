import type { TRequestActionType } from '../Types/Redux/TRequestActionType';

const createRequestAction = (name: string): TRequestActionType => {
  console.log(`=========== createRequestAction(${name})`);
  return {
    REQUEST: Symbol(`${name}_REQUEST`),
    SUCCESS: Symbol(`${name}_SUCCESS`),
    FAILURE: Symbol(`${name}_FAILURE`),
  };
};

export default createRequestAction;
