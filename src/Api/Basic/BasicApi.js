/* eslint max-len: ["error", { "code": 3841 }] */
// @flow
import urljoin from 'url-join';

const fetch = require('isomorphic-fetch');

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const getParams = (method: string, token: ?string, data?: mixed): Object => {
  const headers = token == null
    ? DEFAULT_HEADERS
    : {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${token}`,
    };

  const params = {
    method,
    headers,
  };

  if (data != null) {
    params.body = JSON.stringify(data);
  }

  return params;
};

const DEFAULT_URL = 'http://localhost:8000/v1/';

function getJson(response) {
  return response.json().then((json) => {
    if (json.success) return json;
    throw new Error(json.message);
  });
}

class BasicApi {
  constructor(apiUrl: string = DEFAULT_URL) {
    this.apiUrl = apiUrl;
  }

  getUrl = (url: string): string => urljoin(this.apiUrl, url);

  get = async (url: string): Promise<mixed> => fetch(this.getUrl(url), getParams('GET', null)).then(getJson);

  post = async (url: string, data: ?Object): Promise<mixed> => fetch(this.getUrl(url), getParams('POST', null, data)).then(getJson);

  put = async (url: string, data: ?Object): Promise<mixed> => fetch(this.getUrl(url), getParams('PUT', null, data)).then(getJson);

  delete = async (url: string, data: ?Object): Promise<mixed> => fetch(this.getUrl(url), getParams('DELETE', null, data)).then(getJson);

  getWithToken = async (url: string, token: string): Promise<mixed> => fetch(this.getUrl(url), getParams('GET', token)).then(getJson);

  postWithToken = async (url: string, token: string, data: ?Object): Promise<mixed> => fetch(this.getUrl(url), getParams('POST', token, data)).then(getJson);

  putWithToken = async (url: string, token: string, data: ?Object): Promise<mixed> => fetch(this.getUrl(url), getParams('PUT', token, data)).then(getJson);

  deleteWithToken = async (url: string, token: string, data: ?Object): Promise<mixed> => fetch(this.getUrl(url), getParams('DELETE', token, data)).then(getJson);
}

export default BasicApi;
