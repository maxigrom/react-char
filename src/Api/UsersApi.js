// @flow
import BasicApi from './Basic/BasicApi';

const API = new BasicApi();

class UsersApi {
  static getCurrentUser = async (token: string): Promise => (
    API.getWithToken('/users/me', token)
  );
}

export default UsersApi;
