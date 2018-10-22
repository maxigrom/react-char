// @flow
import type { TStore } from '../../Redux/RootReducer';
import type { TLoginUser } from '../../Types/TLoginUser';
import SignUpForm from './SignUpForm';
import { connect } from 'react-redux';
import { signUp } from '../../Redux/Auth/AuthActions';

const mapStateToProps = (state: TStore) => {
  return {
    redirectToChat: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSignUp: (user: TLoginUser) => dispatch(signUp(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpForm);
