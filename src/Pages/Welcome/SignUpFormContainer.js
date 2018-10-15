// @flow
import type { TStoreState } from '../../Redux/Store';
import type { TLoginUser } from '../../Types/TLoginUser';
import AuthActions from '../../Redux/Auth/AuthActions';
import SignUpForm from './SignUpForm';
import { connect } from 'react-redux';

const mapStateToProps = (state: TStoreState) => {
  return {
    redirectToChat: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSignUp: (user: TLoginUser) => dispatch(AuthActions.signUp(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpForm);
