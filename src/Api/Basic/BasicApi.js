// @flow
import urljoin from 'url-join';

export const getParams = (method: string, data?: mixed): Object => ({
  method: method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

const DEFAULT_URL = 'http://localhost:8000/v1/';

class BasicApi {
  constructor(apiUrl: string = DEFAULT_URL) {
    this.apiUrl = apiUrl;
  }

  getUrl = (url: string): string => urljoin(this.apiUrl, url);

  get = async (url: string): Promise<Response> => {
    try {
      return fetch(this.getUrl(url), getParams("GET"));
    } catch (e) {
      console.error(e);
      console.log({ getError: e.response });

      return e.response;
    }
  };

  post = async (url: string, data: ?Object): Promise<Response> => {
    try {
      return fetch(this.getUrl(url), getParams("POST", data));
    } catch (e) {
      console.error(e);
      console.log({ postError: e.response });

      return e.response;
    }
  };

  put = async (url: string, data: ?Object): Promise<Response> => {
    try {
      return fetch(this.getUrl(url), getParams("PUT", data));
    } catch (e) {
      console.error(e);
      console.log({ putError: e.response });

      return e.response;
    }
  };

  delete = async (url: string, data: ?Object): Promise<Response> => {
    try {
      return fetch(this.getUrl(url), getParams("DELETE", data));
    } catch (e) {
      console.error(e);
      console.log({ deleteError: e.response });

      return e.response;
    }
  };
}

export default BasicApi;
global.BasicApi = BasicApi;
