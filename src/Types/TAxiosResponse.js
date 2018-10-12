// @flow
import type { AxiosResponse } from 'axios/index';
import type { TBaseApiResponse } from './Api/Responses/TBaseApiResponse';

export type TAxiosResponse<T> = AxiosResponse<TBaseApiResponse<T>>
