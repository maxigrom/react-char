// @flow
import urljoin from 'url-join';
import type { Response } from '@types/node-fetch';

export const getParams = (method: string, data?: mixed): Object => ({
  method: method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});


const DEFAULT_URL = 'http://localhost:8000/v1/';

function getJson(response) {
  return response.json()
    .then((json) => {
      if (json.success) return json;
      throw new Error(json.message);
    });
}

class BasicApi {
  constructor(apiUrl: string = DEFAULT_URL) {
    this.apiUrl = apiUrl;
  }

  getUrl = (url: string): string => urljoin(this.apiUrl, url);

  get = async (url: string): Promise<Response> => (
    fetch(this.getUrl(url), getParams('GET')).then(getJson)
  );

  post = async (url: string, data: ?Object): Promise<Response> => (
    fetch(this.getUrl(url), getParams('POST', data)).then(getJson)
  );

  put = async (url: string, data: ?Object): Promise<Response> => (
    fetch(this.getUrl(url), getParams('PUT', data)).then(getJson)
  );

  delete = async (url: string, data: ?Object): Promise<Response> => (
    fetch(this.getUrl(url), getParams('DELETE', data)).then(getJson)
  );
}

export default BasicApi;
