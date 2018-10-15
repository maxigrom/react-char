// @flow
import type { Response } from '@types/node-fetch';

export type TWrappedResponse = {
  response: Response,
  json: Object
};
