// @flow
export type TValueWithError<T> = {
  value: T,
  error: ?string,
};

function newValueWithError<T>(value: T, error: ?string): TValueWithError<T> {
  return { value, error };
}

export default newValueWithError;
