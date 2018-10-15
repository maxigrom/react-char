// @flow
import type { TLoginUser } from '../../Types/TLoginUser';
import AuthActions from '../../Redux/Auth/AuthActions';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import type { TStoreState } from '../../Redux/Store';

const mapStateToProps = (state: TStoreState) => {
  return {
    redirectToChat: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLogin: (user: TLoginUser) => dispatch(AuthActions.login(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
