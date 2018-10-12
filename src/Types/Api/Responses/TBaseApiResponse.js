// @flow
export type TBaseApiResponse<T> = T & {
  success: boolean,
  message: string,
};
