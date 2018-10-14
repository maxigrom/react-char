// @flow
export type TValueWithError<T> = {
  value: T,
  error: ?string
};

export function newValueWithError<T>(value, T, error: ?string): TValueWithError<T> {
  return { value, error }
}
