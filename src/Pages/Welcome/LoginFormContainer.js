// @flow
import type { TLoginUser } from '../../Types/TLoginUser';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import type { TStore } from '../../Redux/RootReducer';
import { login } from '../../Redux/Auth/AuthActions';

const mapStateToProps = (state: TStore) => {
  return {
    redirectToChat: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLogin: (user: TLoginUser) => dispatch(login(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
