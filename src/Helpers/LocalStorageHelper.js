// @flow
const TOKEN_KEY = 'token';

class LocalStorageHelper {
  static getAuthToken = ():string => localStorage.getItem(TOKEN_KEY);
  static setAuthToken = (token: string ) => localStorage.setItem(TOKEN_KEY, token);
  static removeAuthKey = () => localStorage.removeItem(TOKEN_KEY);
}

export default LocalStorageHelper;
