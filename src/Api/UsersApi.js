// @flow
import BasicApi, { getJsonWithResponse } from './Basic/BasicApi';
import type { TLoginUser } from '../Types/TLoginUser';
import type { TApiSignUpResponse, TSignUpJson } from '../Types/Api/Jsons/TSignUpJson';

const API = new BasicApi();

class UsersApi {
  static getCurrentUser = async (token: string): Promise => (
    API.getWithToken('/users/me', token)
  );
}

export default UsersApi;
