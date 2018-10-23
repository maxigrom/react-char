// @flow
import BasicApi from './Basic/BasicApi';

const API = new BasicApi();

class AuthApi {
  static signup = async (user: TLoginUser): Promise => (
    API.post('/signup', user)
  );

  static login = async (user: TLoginUser): Promise => (
    API.post('/login', user)
  );

  static logout = async (): Promise => (
    API.get('/logout')
  );
}

export default AuthApi;
