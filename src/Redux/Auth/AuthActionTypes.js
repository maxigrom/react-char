const AuthActionTypes = {
  SIGNUP: {
    REQUEST: Symbol('auth/SIGNUP_REQUEST'),
    SUCCESS: Symbol('auth/SIGNUP_SUCCESS'),
    FAILURE: Symbol('auth/SIGNUP_FAILURE'),
  },

  LOGIN: {
    REQUEST: Symbol('auth/LOGIN_REQUEST'),
    SUCCESS: Symbol('auth/LOGIN_SUCCESS'),
    FAILURE: Symbol('auth/LOGIN_FAILURE'),
  },

  LOGOUT: {
    REQUEST: Symbol('auth/LOGOUT_REQUEST'),
    SUCCESS: Symbol('auth/LOGOUT_SUCCESS'),
    FAILURE: Symbol('auth/LOGOUT_FAILURE'),
  },
};

export default AuthActionTypes;
