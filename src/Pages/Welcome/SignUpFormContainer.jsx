// @flow
import { connect } from 'react-redux';
import type { TStore } from '../../Redux/RootReducer';
import type { TLoginUser } from '../../Types/TLoginUser';
import SignUpForm from './SignUpForm';
import { signUp } from '../../Redux/Auth/AuthActions';

const mapStateToProps = (state: TStore) => ({
  loading: state.services.isFetching.signup,
  redirectToChat: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  onSignUp: (user: TLoginUser) => dispatch(signUp(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpForm);
