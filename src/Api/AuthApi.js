// @flow

import BasicApi from './Basic/BasicApi';
import type { TApiSignUpResponse } from '../Types/Api/Responses/TApiSignUpResponse';
import type { TLoginUser } from '../Types/TLoginUser';

const API = new BasicApi();

class AuthApi {
  static signup = async (user: TLoginUser): Promise<Response> => {
    return API.post('/signup', user);
  };

  static login = async (user: TLoginUser): Promise<Response> => {
    return API.post('/login', user);
  };

  static logout = async (): Promise<Response> => {
    return API.get('/logout');
  };
}

export default AuthApi;
